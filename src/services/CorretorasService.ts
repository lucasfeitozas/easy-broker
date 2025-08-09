import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import Corretoras from '../models/Corretoras';
import { CreateCorretoraDTO, UpdateCorretoraDTO } from '../dtos/CorretorasDTO';
import AppError from '../errors/AppError';

class CorretorasService {
  private corretorasRepository: Repository<Corretoras>;

  constructor() {
    this.corretorasRepository = AppDataSource.getRepository(Corretoras);
  }

  async create(data: CreateCorretoraDTO): Promise<Corretoras> {
    // Verificar se já existe uma corretora com o mesmo nome
    const corretoraExistente = await this.corretorasRepository.findOne({
      where: { nome: data.nome.trim() }
    });
    if (corretoraExistente) {
      throw new AppError('Já existe uma corretora com este nome', 400);
    }

    // Verificar se já existe uma corretora com o mesmo CNPJ (se fornecido)
    if (data.cnpj) {
      const corretoraCnpjExistente = await this.corretorasRepository.findOne({
        where: { cnpj: data.cnpj }
      });
      if (corretoraCnpjExistente) {
        throw new AppError('Já existe uma corretora com este CNPJ', 400);
      }
    }

    // Validar dados
    if (!data.nome || data.nome.trim().length === 0) {
      throw new AppError('Nome da corretora é obrigatório', 400);
    }

    const corretora = this.corretorasRepository.create({
      nome: data.nome.trim(),
      cnpj: data.cnpj,
      codigo: data.codigo,
      site: data.site,
      telefone: data.telefone,
      email: data.email,
      observacoes: data.observacoes,
    });

    return await this.corretorasRepository.save(corretora);
  }

  async findAll(): Promise<Corretoras[]> {
    return await this.corretorasRepository.find({
      order: { nome: 'ASC' },
    });
  }

  async findById(id: number): Promise<Corretoras> {
    const corretora = await this.corretorasRepository.findOne({
      where: { id },
    });

    if (!corretora) {
      throw new AppError('Corretora não encontrada', 404);
    }

    return corretora;
  }

  async findByNome(nome: string): Promise<Corretoras> {
    const corretora = await this.corretorasRepository.findOne({
      where: { nome: nome.trim() },
    });

    if (!corretora) {
      throw new AppError('Corretora não encontrada', 404);
    }

    return corretora;
  }

  async findByCodigo(codigo: string): Promise<Corretoras | null> {
    return await this.corretorasRepository.findOne({
      where: { codigo },
    });
  }

  async update(id: number, data: UpdateCorretoraDTO): Promise<Corretoras> {
    const corretora = await this.findById(id);

    // Verificar se já existe uma corretora com o mesmo nome (se fornecido)
    if (data.nome) {
      const corretoraExistente = await this.corretorasRepository.findOne({
        where: { nome: data.nome.trim() }
      });
      if (corretoraExistente && corretoraExistente.id !== id) {
        throw new AppError('Já existe uma corretora com este nome', 400);
      }
    }

    // Verificar se já existe uma corretora com o mesmo CNPJ (se fornecido)
    if (data.cnpj) {
      const corretoraCnpjExistente = await this.corretorasRepository.findOne({
        where: { cnpj: data.cnpj }
      });
      if (corretoraCnpjExistente && corretoraCnpjExistente.id !== id) {
        throw new AppError('Já existe uma corretora com este CNPJ', 400);
      }
    }

    // Validar dados
    if (data.nome && data.nome.trim().length === 0) {
      throw new AppError('Nome da corretora não pode ser vazio', 400);
    }

    Object.assign(corretora, {
      ...(data.nome && { nome: data.nome.trim() }),
      ...(data.cnpj !== undefined && { cnpj: data.cnpj }),
      ...(data.codigo !== undefined && { codigo: data.codigo }),
      ...(data.site !== undefined && { site: data.site }),
      ...(data.telefone !== undefined && { telefone: data.telefone }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.observacoes !== undefined && { observacoes: data.observacoes }),
    });

    return await this.corretorasRepository.save(corretora);
  }

  async delete(id: number): Promise<void> {
    const corretora = await this.findById(id);
    
    // Verificar se a corretora possui lançamentos associados
    const lancamentosCount = await AppDataSource
      .getRepository('Lancamentos')
      .count({ where: { corretora_id: id } });
    
    if (lancamentosCount > 0) {
      throw new AppError(
        'Não é possível excluir a corretora pois existem lançamentos associados',
        400
      );
    }

    await this.corretorasRepository.remove(corretora);
  }

  async search(termo: string): Promise<Corretoras[]> {
    if (!termo || termo.trim().length === 0) {
      return await this.findAll();
    }

    const termoFormatado = `%${termo.trim().toUpperCase()}%`;

    return await this.corretorasRepository
      .createQueryBuilder('corretora')
      .where('UPPER(corretora.nome) LIKE :termo', { termo: termoFormatado })
      .orWhere('UPPER(corretora.codigo) LIKE :termo', { termo: termoFormatado })
      .orWhere('corretora.cnpj LIKE :termo', { termo: termoFormatado })
      .orderBy('corretora.nome', 'ASC')
      .getMany();
  }

  async getEstatisticas(): Promise<{
    totalCorretoras: number;
    corretorasComLancamentos: number;
    corretorasSemLancamentos: number;
  }> {
    const totalCorretoras = await this.corretorasRepository.count();

    const corretorasComLancamentos = await this.corretorasRepository
      .createQueryBuilder('corretora')
      .leftJoin('Lancamentos', 'lancamento', 'lancamento.corretora_id = corretora.id')
      .where('lancamento.id IS NOT NULL')
      .getCount();

    return {
      totalCorretoras,
      corretorasComLancamentos,
      corretorasSemLancamentos: totalCorretoras - corretorasComLancamentos,
    };
  }

  async getResumoLancamentos(id: number): Promise<{
    corretora: Corretoras;
    totalOperacoes: number;
    totalCompras: number;
    totalVendas: number;
    valorTotalInvestido: number;
    ultimaOperacao?: Date;
  }> {
    const corretora = await this.findById(id);

    const resumo = await AppDataSource
      .getRepository('Lancamentos')
      .createQueryBuilder('lancamento')
      .select('COUNT(*)', 'totalOperacoes')
      .addSelect('SUM(CASE WHEN operacao = "compra" THEN 1 ELSE 0 END)', 'totalCompras')
      .addSelect('SUM(CASE WHEN operacao = "venda" THEN 1 ELSE 0 END)', 'totalVendas')
      .addSelect('SUM(CASE WHEN operacao = "compra" THEN valor * quantidade ELSE -valor * quantidade END)', 'valorTotalInvestido')
      .addSelect('MAX(dataLancamento)', 'ultimaOperacao')
      .where('corretora_id = :id', { id })
      .getRawOne();

    return {
      corretora,
      totalOperacoes: parseInt(resumo.totalOperacoes) || 0,
      totalCompras: parseInt(resumo.totalCompras) || 0,
      totalVendas: parseInt(resumo.totalVendas) || 0,
      valorTotalInvestido: parseFloat(resumo.valorTotalInvestido) || 0,
      ultimaOperacao: resumo.ultimaOperacao ? new Date(resumo.ultimaOperacao) : undefined,
    };
  }
}

export default CorretorasService;
