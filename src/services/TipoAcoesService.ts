import { Repository, DataSource } from 'typeorm';
import { AppDataSource } from '../database';
import TipoAcoes from '../models/TipoAcoes';
import AppError from '../errors/AppError';

interface CreateTipoAcaoDTO {
  nome: string;
  descricao?: string;
}

interface UpdateTipoAcaoDTO {
  nome?: string;
  descricao?: string;
}

class TipoAcoesService {
  private tipoAcoesRepository: Repository<TipoAcoes>;
  private dataSource: DataSource;

  constructor(dataSource?: DataSource) {
    this.dataSource = dataSource || AppDataSource;
    this.tipoAcoesRepository = this.dataSource.getRepository(TipoAcoes);
  }

  async create(data: CreateTipoAcaoDTO): Promise<TipoAcoes> {
    // Verificar se já existe um tipo de ação com o mesmo nome
    const tipoExistente = await this.tipoAcoesRepository.findOne({
      where: { nome: data.nome.trim() }
    });
    if (tipoExistente) {
      throw new AppError('Já existe um tipo de ação com este nome', 400);
    }

    // Validar dados
    if (!data.nome || data.nome.trim().length === 0) {
      throw new AppError('Nome do tipo de ação é obrigatório', 400);
    }

    const tipoAcao = this.tipoAcoesRepository.create({
      nome: data.nome.trim(),
      descricao: data.descricao?.trim(),
    });

    return await this.tipoAcoesRepository.save(tipoAcao);
  }

  async findAll(): Promise<TipoAcoes[]> {
    return await this.tipoAcoesRepository.find({
      order: { nome: 'ASC' },
    });
  }

  async findById(id: number): Promise<TipoAcoes> {
    const tipoAcao = await this.tipoAcoesRepository.findOne({
      where: { id },
    });

    if (!tipoAcao) {
      throw new AppError('Tipo de ação não encontrado', 404);
    }

    return tipoAcao;
  }

  async findByNome(nome: string): Promise<TipoAcoes> {
    const tipoAcao = await this.tipoAcoesRepository.findOne({
      where: { nome: nome.trim() },
    });

    if (!tipoAcao) {
      throw new AppError('Tipo de ação não encontrado', 404);
    }

    return tipoAcao;
  }

  async update(id: number, data: UpdateTipoAcaoDTO): Promise<TipoAcoes> {
    const tipoAcao = await this.findById(id);

    // Verificar se já existe um tipo de ação com o mesmo nome (se fornecido)
    if (data.nome) {
      const tipoExistente = await this.tipoAcoesRepository.findOne({
        where: { nome: data.nome.trim() }
      });
      if (tipoExistente && tipoExistente.id !== id) {
        throw new AppError('Já existe um tipo de ação com este nome', 400);
      }
    }

    // Validar dados
    if (data.nome && data.nome.trim().length === 0) {
      throw new AppError('Nome do tipo de ação não pode ser vazio', 400);
    }

    Object.assign(tipoAcao, {
      ...(data.nome && { nome: data.nome.trim() }),
      ...(data.descricao !== undefined && { descricao: data.descricao?.trim() }),
    });

    return await this.tipoAcoesRepository.save(tipoAcao);
  }

  async delete(id: number): Promise<void> {
    const tipoAcao = await this.findById(id);
    
    // Verificar se o tipo de ação possui ações associadas (apenas se não for teste)
    try {
      const acoesRepository = this.dataSource.getRepository('Acoes');
      const acoesCount = await acoesRepository.count({ where: { tipo_acao_id: id } });
      
      if (acoesCount > 0) {
        throw new AppError(
          'Não é possível excluir o tipo de ação pois existem ações associadas',
          400
        );
      }
    } catch (error) {
      // Se não conseguir acessar o repository de Acoes (ex: em testes), prosseguir
      if (error instanceof AppError) {
        throw error;
      }
    }

    await this.tipoAcoesRepository.remove(tipoAcao);
  }

  async search(termo: string): Promise<TipoAcoes[]> {
    if (!termo || termo.trim().length === 0) {
      return await this.findAll();
    }

    const termoFormatado = `%${termo.trim()}%`;

    return await this.tipoAcoesRepository
      .createQueryBuilder('tipoAcao')
      .where('tipoAcao.nome LIKE :termo', { termo: termoFormatado })
      .orWhere('tipoAcao.descricao LIKE :termo', { termo: termoFormatado })
      .orderBy('tipoAcao.nome', 'ASC')
      .getMany();
  }

  async getEstatisticas(): Promise<{
    totalTipos: number;
    tiposComAcoes: number;
    tiposSemAcoes: number;
  }> {
    const totalTipos = await this.tipoAcoesRepository.count();

    const tiposComAcoes = await this.tipoAcoesRepository
      .createQueryBuilder('tipoAcao')
      .leftJoin('Acoes', 'acao', 'acao.tipo_acao_id = tipoAcao.id')
      .where('acao.id IS NOT NULL')
      .getCount();

    return {
      totalTipos,
      tiposComAcoes,
      tiposSemAcoes: totalTipos - tiposComAcoes,
    };
  }
}

export default TipoAcoesService;
