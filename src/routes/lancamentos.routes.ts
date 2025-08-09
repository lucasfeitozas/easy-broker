import { Router, Request, Response } from 'express';
import LancamentosService from '../services/LancamentosService';
import { FiltroRelatorioDTO } from '../dtos/LancamentosDTO';

const lancamentosRouter = Router();
const lancamentosService = new LancamentosService();

// GET /lancamentos - Listar todos os lançamentos com filtros opcionais
lancamentosRouter.get('/', async (request: Request, response: Response) => {
  try {
    const filtros: FiltroRelatorioDTO = {
      corretoraId: request.query.corretoraId ? Number(request.query.corretoraId) : undefined,
      acoesId: request.query.acoesId ? Number(request.query.acoesId) : undefined,
      operacao: request.query.operacao as any,
      dataInicio: request.query.dataInicio as string,
      dataFim: request.query.dataFim as string,
      periodo: request.query.periodo as any,
      ano: request.query.ano ? Number(request.query.ano) : undefined,
      mes: request.query.mes ? Number(request.query.mes) : undefined,
    };

    const lancamentos = await lancamentosService.findAll(filtros);
    return response.json(lancamentos);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /lancamentos/:id - Buscar lançamento por ID
lancamentosRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const lancamento = await lancamentosService.findById(Number(id));
    return response.json(lancamento);
  } catch (error: any) {
    if (error.statusCode === 404) {
      return response.status(404).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /lancamentos - Criar novo lançamento
lancamentosRouter.post('/', async (request: Request, response: Response) => {
  try {
    const lancamento = await lancamentosService.create(request.body);
    return response.status(201).json(lancamento);
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT /lancamentos/:id - Atualizar lançamento
lancamentosRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const lancamento = await lancamentosService.update(Number(id), request.body);
    return response.json(lancamento);
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE /lancamentos/:id - Excluir lançamento
lancamentosRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await lancamentosService.delete(Number(id));
    return response.status(204).send();
  } catch (error: any) {
    if (error.statusCode === 404) {
      return response.status(404).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /lancamentos/relatorios/posicao - Relatório de posição atual
lancamentosRouter.get('/relatorios/posicao', async (request: Request, response: Response) => {
  try {
    const filtros: FiltroRelatorioDTO = {
      corretoraId: request.query.corretoraId ? Number(request.query.corretoraId) : undefined,
      acoesId: request.query.acoesId ? Number(request.query.acoesId) : undefined,
      dataInicio: request.query.dataInicio as string,
      dataFim: request.query.dataFim as string,
      periodo: request.query.periodo as any,
      ano: request.query.ano ? Number(request.query.ano) : undefined,
      mes: request.query.mes ? Number(request.query.mes) : undefined,
    };

    const relatorio = await lancamentosService.gerarRelatorioPosicao(filtros);
    return response.json(relatorio);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /lancamentos/relatorios/movimentacao - Relatório de movimentação
lancamentosRouter.get('/relatorios/movimentacao', async (request: Request, response: Response) => {
  try {
    const filtros: FiltroRelatorioDTO = {
      corretoraId: request.query.corretoraId ? Number(request.query.corretoraId) : undefined,
      acoesId: request.query.acoesId ? Number(request.query.acoesId) : undefined,
      operacao: request.query.operacao as any,
      dataInicio: request.query.dataInicio as string,
      dataFim: request.query.dataFim as string,
      periodo: request.query.periodo as any,
      ano: request.query.ano ? Number(request.query.ano) : undefined,
      mes: request.query.mes ? Number(request.query.mes) : undefined,
    };

    const relatorio = await lancamentosService.gerarRelatorioMovimentacao(filtros);
    return response.json(relatorio);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default lancamentosRouter;
