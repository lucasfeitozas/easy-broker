import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import Acoes from '../models/Acoes';
import TipoAcoes from '../models/TipoAcoes';
import { CreateAcaoDTO, UpdateAcaoDTO } from '../dtos/AcoesDTO';
import AppError from '../errors/AppError';

class AcoesService {
  private acoesRepository: Repository<Acoes>;

  private tipoAcoesRepository: Repository<TipoAcoes>;

  constructor() {
    this.acoesRepository = AppDataSource.getRepository(Acoes);
    this.tipoAcoesRepository = AppDataSource.getRepository(TipoAcoes);
  }

  async create(data: CreateAcaoDTO): Promise<Acoes> {
    // Validar se o tipo de ação existe
    const tipoAcao = await this.tipoAcoesRepository.findOne({
      where: { id: data.tipoAcaoId },
    });
    if (!tipoAcao) {
      throw new AppError('Tipo de ação não encontrado', 404);
    }

    // Verificar se já existe uma ação com o mesmo ticker
    const acaoExistente = await this.acoesRepository.findOne({
      where: { ticker: data.ticker.toUpperCase() },
    });
    if (acaoExistente) {
      throw new AppError('Já existe uma ação com este ticker', 400);
    }

    // Validar dados
    if (!data.ticker || data.ticker.trim().length === 0) {
      throw new AppError('Ticker é obrigatório', 400);
    }
    if (!data.nome || data.nome.trim().length === 0) {
      throw new AppError('Nome da ação é obrigatório', 400);
    }

    const acao = this.acoesRepository.create({
      ticker: data.ticker.toUpperCase(),
      nome: data.nome.trim(),
      cnpj: data.cnpj,
      descricao: data.descricao,
      tipo_acao_id: data.tipoAcaoId,
    });

    return await this.acoesRepository.save(acao);
  }

  async findAll(): Promise<Acoes[]> {
    return await this.acoesRepository.find({
      relations: ['tipoAcao'],
      order: { ticker: 'ASC' },
    });
  }

  async findById(id: number): Promise<Acoes> {
    const acao = await this.acoesRepository.findOne({
      where: { id },
      relations: ['tipoAcao'],
    });

    if (!acao) {
      throw new AppError('Ação não encontrada', 404);
    }

    return acao;
  }

  async findByTicker(ticker: string): Promise<Acoes> {
    const acao = await this.acoesRepository.findOne({
      where: { ticker: ticker.toUpperCase() },
      relations: ['tipoAcao'],
    });

    if (!acao) {
      throw new AppError('Ação não encontrada', 404);
    }

    return acao;
  }

  async findByTipoAcao(tipoAcaoId: number): Promise<Acoes[]> {
    const tipoAcao = await this.tipoAcoesRepository.findOne({
      where: { id: tipoAcaoId },
    });
    if (!tipoAcao) {
      throw new AppError('Tipo de ação não encontrado', 404);
    }

    return await this.acoesRepository.find({
      where: { tipo_acao_id: tipoAcaoId },
      relations: ['tipoAcao'],
      order: { ticker: 'ASC' },
    });
  }

  async update(id: number, data: UpdateAcaoDTO): Promise<Acoes> {
    const acao = await this.findById(id);

    // Validar se o tipo de ação existe (se fornecido)
    if (data.tipoAcaoId) {
      const tipoAcao = await this.tipoAcoesRepository.findOne({
        where: { id: data.tipoAcaoId },
      });
      if (!tipoAcao) {
        throw new AppError('Tipo de ação não encontrado', 404);
      }
    }

    // Verificar se já existe uma ação com o mesmo ticker (se fornecido)
    if (data.ticker) {
      const acaoExistente = await this.acoesRepository.findOne({
        where: { ticker: data.ticker.toUpperCase() },
      });
      if (acaoExistente && acaoExistente.id !== id) {
        throw new AppError('Já existe uma ação com este ticker', 400);
      }
    }

    // Validar dados
    if (data.ticker && data.ticker.trim().length === 0) {
      throw new AppError('Ticker não pode ser vazio', 400);
    }
    if (data.nome && data.nome.trim().length === 0) {
      throw new AppError('Nome da ação não pode ser vazio', 400);
    }

    Object.assign(acao, {
      ...(data.ticker && { ticker: data.ticker.toUpperCase() }),
      ...(data.nome && { nome: data.nome.trim() }),
      ...(data.cnpj !== undefined && { cnpj: data.cnpj }),
      ...(data.tipoAcaoId && { tipo_acao_id: data.tipoAcaoId }),
    });

    return await this.acoesRepository.save(acao);
  }

  async delete(id: number): Promise<void> {
    const acao = await this.findById(id);

    // Verificar se a ação possui lançamentos associados
    const lancamentosCount = await AppDataSource.getRepository(
      'Lancamentos',
    ).count({ where: { acoes_id: id } });

    if (lancamentosCount > 0) {
      throw new AppError(
        'Não é possível excluir a ação pois existem lançamentos associados',
        400,
      );
    }

    await this.acoesRepository.remove(acao);
  }

  async search(termo: string): Promise<Acoes[]> {
    if (!termo || termo.trim().length === 0) {
      return await this.findAll();
    }

    const termoFormatado = `%${termo.trim().toUpperCase()}%`;

    return await this.acoesRepository
      .createQueryBuilder('acao')
      .leftJoinAndSelect('acao.tipoAcao', 'tipoAcao')
      .where('UPPER(acao.ticker) LIKE :termo', { termo: termoFormatado })
      .orWhere('UPPER(acao.nome) LIKE :termo', { termo: termoFormatado })
      .orderBy('acao.ticker', 'ASC')
      .getMany();
  }

  async getEstatisticas(): Promise<{
    totalAcoes: number;
    acoesPorTipo: { tipo: string; quantidade: number }[];
  }> {
    const totalAcoes = await this.acoesRepository.count();

    const acoesPorTipo = await this.acoesRepository
      .createQueryBuilder('acao')
      .leftJoin('acao.tipoAcao', 'tipoAcao')
      .select('tipoAcao.nome', 'tipo')
      .addSelect('COUNT(acao.id)', 'quantidade')
      .groupBy('tipoAcao.id')
      .getRawMany();

    return {
      totalAcoes,
      acoesPorTipo: acoesPorTipo.map(item => ({
        tipo: item.tipo || 'Sem tipo',
        quantidade: parseInt(item.quantidade),
      })),
    };
  }
}

export default AcoesService;
