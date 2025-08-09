import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import Lancamentos, { TipoOperacao } from '../models/Lancamentos';
import Acoes from '../models/Acoes';
import Corretoras from '../models/Corretoras';
import {
  CreateLancamentoDTO,
  UpdateLancamentoDTO,
  FiltroRelatorioDTO,
} from '../dtos/LancamentosDTO';
import AppError from '../errors/AppError';

interface RelatorioItem {
  ticker: string;
  nomeAcao: string;
  corretora: string;
  quantidadeTotal: number;
  valorMedio: number;
  valorTotalInvestido: number;
  operacoes: number;
}

interface RelatorioPosicao {
  posicaoAtual: RelatorioItem[];
  totalInvestido: number;
  totalAcoes: number;
}

interface RelatorioMovimentacao {
  compras: Lancamentos[];
  vendas: Lancamentos[];
  totalCompras: number;
  totalVendas: number;
  saldo: number;
}

class LancamentosService {
  private lancamentosRepository: Repository<Lancamentos>;

  private acoesRepository: Repository<Acoes>;

  private corretorasRepository: Repository<Corretoras>;

  constructor() {
    this.lancamentosRepository = AppDataSource.getRepository(Lancamentos);
    this.acoesRepository = AppDataSource.getRepository(Acoes);
    this.corretorasRepository = AppDataSource.getRepository(Corretoras);
  }

  async create(data: CreateLancamentoDTO): Promise<Lancamentos> {
    // Validar se a ação existe
    const acao = await this.acoesRepository.findOne({
      where: { id: data.acoesId },
    });
    if (!acao) {
      throw new AppError('Ação não encontrada', 404);
    }

    // Validar se a corretora existe
    const corretora = await this.corretorasRepository.findOne({
      where: { id: data.corretoraId },
    });
    if (!corretora) {
      throw new AppError('Corretora não encontrada', 404);
    }

    // Validar dados
    if (data.quantidade <= 0) {
      throw new AppError('Quantidade deve ser maior que zero', 400);
    }
    if (data.valor <= 0) {
      throw new AppError('Valor deve ser maior que zero', 400);
    }

    const lancamento = this.lancamentosRepository.create({
      quantidade: data.quantidade,
      valor: data.valor,
      dataLancamento: data.dataLancamento,
      operacao: data.operacao as TipoOperacao,
      corretora_id: data.corretoraId,
      acoes_id: data.acoesId,
      observacoes: data.observacoes,
    });

    return await this.lancamentosRepository.save(lancamento);
  }

  async findAll(filtros?: FiltroRelatorioDTO): Promise<Lancamentos[]> {
    const queryBuilder = this.lancamentosRepository
      .createQueryBuilder('lancamento')
      .leftJoinAndSelect('lancamento.acao', 'acao')
      .leftJoinAndSelect('lancamento.corretora', 'corretora')
      .leftJoinAndSelect('acao.tipoAcao', 'tipoAcao');

    if (filtros) {
      if (filtros.corretoraId) {
        queryBuilder.andWhere('lancamento.corretora_id = :corretoraId', {
          corretoraId: filtros.corretoraId,
        });
      }

      if (filtros.acoesId) {
        queryBuilder.andWhere('lancamento.acoes_id = :acoesId', {
          acoesId: filtros.acoesId,
        });
      }

      if (filtros.operacao) {
        queryBuilder.andWhere('lancamento.operacao = :operacao', {
          operacao: filtros.operacao,
        });
      }

      if (filtros.dataInicio && filtros.dataFim) {
        const dataInicio = new Date(filtros.dataInicio);
        const dataFim = new Date(filtros.dataFim);
        queryBuilder.andWhere(
          'lancamento.dataLancamento BETWEEN :dataInicio AND :dataFim',
          {
            dataInicio,
            dataFim,
          },
        );
      }

      // Filtros por período
      if (filtros.periodo === 'mensal' && filtros.ano && filtros.mes) {
        queryBuilder.andWhere(
          'YEAR(lancamento.dataLancamento) = :ano AND MONTH(lancamento.dataLancamento) = :mes',
          { ano: filtros.ano, mes: filtros.mes },
        );
      }

      if (filtros.periodo === 'anual' && filtros.ano) {
        queryBuilder.andWhere('YEAR(lancamento.dataLancamento) = :ano', {
          ano: filtros.ano,
        });
      }
    }

    return await queryBuilder
      .orderBy('lancamento.dataLancamento', 'DESC')
      .getMany();
  }

  async findById(id: number): Promise<Lancamentos> {
    const lancamento = await this.lancamentosRepository.findOne({
      where: { id },
      relations: ['acao', 'corretora', 'acao.tipoAcao'],
    });

    if (!lancamento) {
      throw new AppError('Lançamento não encontrado', 404);
    }

    return lancamento;
  }

  async update(id: number, data: UpdateLancamentoDTO): Promise<Lancamentos> {
    const lancamento = await this.findById(id);

    // Validar se a ação existe (se fornecida)
    if (data.acoesId) {
      const acao = await this.acoesRepository.findOne({
        where: { id: data.acoesId },
      });
      if (!acao) {
        throw new AppError('Ação não encontrada', 404);
      }
    }

    // Validar se a corretora existe (se fornecida)
    if (data.corretoraId) {
      const corretora = await this.corretorasRepository.findOne({
        where: { id: data.corretoraId },
      });
      if (!corretora) {
        throw new AppError('Corretora não encontrada', 404);
      }
    }

    // Validar dados
    if (data.quantidade && data.quantidade <= 0) {
      throw new AppError('Quantidade deve ser maior que zero', 400);
    }
    if (data.valor && data.valor <= 0) {
      throw new AppError('Valor deve ser maior que zero', 400);
    }

    Object.assign(lancamento, {
      ...(data.quantidade && { quantidade: data.quantidade }),
      ...(data.valor && { valor: data.valor }),
      ...(data.dataLancamento && { dataLancamento: data.dataLancamento }),
      ...(data.operacao && { operacao: data.operacao }),
      ...(data.corretoraId && { corretora_id: data.corretoraId }),
      ...(data.acoesId && { acoes_id: data.acoesId }),
      ...(data.observacoes !== undefined && { observacoes: data.observacoes }),
    });

    return await this.lancamentosRepository.save(lancamento);
  }

  async delete(id: number): Promise<void> {
    const lancamento = await this.findById(id);
    await this.lancamentosRepository.remove(lancamento);
  }

  async gerarRelatorioPosicao(
    filtros?: FiltroRelatorioDTO,
  ): Promise<RelatorioPosicao> {
    const lancamentos = await this.findAll(filtros);

    const posicoes = new Map<
      string,
      {
        ticker: string;
        nomeAcao: string;
        corretora: string;
        quantidade: number;
        valorTotal: number;
        operacoes: number;
      }
    >();

    lancamentos.forEach(lancamento => {
      const key = `${lancamento.acao.ticker}-${lancamento.corretora.nome}`;
      const quantidade =
        lancamento.operacao === TipoOperacao.COMPRA
          ? lancamento.quantidade
          : -lancamento.quantidade;
      const valor =
        lancamento.operacao === TipoOperacao.COMPRA
          ? lancamento.valor * lancamento.quantidade
          : -lancamento.valor * lancamento.quantidade;

      if (posicoes.has(key)) {
        const posicao = posicoes.get(key)!;
        posicao.quantidade += quantidade;
        posicao.valorTotal += valor;
        posicao.operacoes += 1;
      } else {
        posicoes.set(key, {
          ticker: lancamento.acao.ticker,
          nomeAcao: lancamento.acao.nome,
          corretora: lancamento.corretora.nome,
          quantidade,
          valorTotal: valor,
          operacoes: 1,
        });
      }
    });

    const posicaoAtual: RelatorioItem[] = Array.from(posicoes.values())
      .filter(posicao => posicao.quantidade > 0)
      .map(posicao => ({
        ticker: posicao.ticker,
        nomeAcao: posicao.nomeAcao,
        corretora: posicao.corretora,
        quantidadeTotal: posicao.quantidade,
        valorMedio: posicao.valorTotal / posicao.quantidade,
        valorTotalInvestido: posicao.valorTotal,
        operacoes: posicao.operacoes,
      }))
      .sort((a, b) => b.valorTotalInvestido - a.valorTotalInvestido);

    const totalInvestido = posicaoAtual.reduce(
      (total, item) => total + item.valorTotalInvestido,
      0,
    );
    const totalAcoes = posicaoAtual.reduce(
      (total, item) => total + item.quantidadeTotal,
      0,
    );

    return {
      posicaoAtual,
      totalInvestido,
      totalAcoes,
    };
  }

  async gerarRelatorioMovimentacao(
    filtros?: FiltroRelatorioDTO,
  ): Promise<RelatorioMovimentacao> {
    const lancamentos = await this.findAll(filtros);

    const compras = lancamentos.filter(l => l.operacao === TipoOperacao.COMPRA);
    const vendas = lancamentos.filter(l => l.operacao === TipoOperacao.VENDA);

    const totalCompras = compras.reduce(
      (total, compra) => total + compra.valor * compra.quantidade,
      0,
    );
    const totalVendas = vendas.reduce(
      (total, venda) => total + venda.valor * venda.quantidade,
      0,
    );

    return {
      compras,
      vendas,
      totalCompras,
      totalVendas,
      saldo: totalVendas - totalCompras,
    };
  }
}

export default LancamentosService;
