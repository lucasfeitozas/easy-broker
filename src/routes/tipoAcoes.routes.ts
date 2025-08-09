import { Router, Request, Response } from 'express';
import TipoAcoesService from '../services/TipoAcoesService';

const tipoAcoesRouter = Router();
const tipoAcoesService = new TipoAcoesService();

// GET /tipo-acoes - Listar todos os tipos de ações
tipoAcoesRouter.get('/', async (request: Request, response: Response) => {
  try {
    const tiposAcoes = await tipoAcoesService.findAll();
    return response.json(tiposAcoes);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /tipo-acoes/search - Buscar tipos de ações por termo
tipoAcoesRouter.get('/search', async (request: Request, response: Response) => {
  try {
    const { termo } = request.query;
    const tiposAcoes = await tipoAcoesService.search(termo as string);
    return response.json(tiposAcoes);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /tipo-acoes/estatisticas - Estatísticas dos tipos de ações
tipoAcoesRouter.get('/estatisticas', async (request: Request, response: Response) => {
  try {
    const estatisticas = await tipoAcoesService.getEstatisticas();
    return response.json(estatisticas);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /tipo-acoes/:id - Buscar tipo de ação por ID
tipoAcoesRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const tipoAcao = await tipoAcoesService.findById(Number(id));
    return response.json(tipoAcao);
  } catch (error: any) {
    if (error.statusCode === 404) {
      return response.status(404).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /tipo-acoes - Criar novo tipo de ação
tipoAcoesRouter.post('/', async (request: Request, response: Response) => {
  try {
    const tipoAcao = await tipoAcoesService.create(request.body);
    return response.status(201).json(tipoAcao);
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT /tipo-acoes/:id - Atualizar tipo de ação
tipoAcoesRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const tipoAcao = await tipoAcoesService.update(Number(id), request.body);
    return response.json(tipoAcao);
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE /tipo-acoes/:id - Excluir tipo de ação
tipoAcoesRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await tipoAcoesService.delete(Number(id));
    return response.status(204).send();
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default tipoAcoesRouter;
