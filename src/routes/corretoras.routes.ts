import { Router, Request, Response } from 'express';
import CorretorasService from '../services/CorretorasService';

const corretorasRouter = Router();
const corretorasService = new CorretorasService();

// GET /corretoras - Listar todas as corretoras
corretorasRouter.get('/', async (request: Request, response: Response) => {
  try {
    const corretoras = await corretorasService.findAll();
    return response.json(corretoras);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /corretoras/search - Buscar corretoras por termo
corretorasRouter.get('/search', async (request: Request, response: Response) => {
  try {
    const { termo } = request.query;
    const corretoras = await corretorasService.search(termo as string);
    return response.json(corretoras);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /corretoras/estatisticas - Estatísticas das corretoras
corretorasRouter.get('/estatisticas', async (request: Request, response: Response) => {
  try {
    const estatisticas = await corretorasService.getEstatisticas();
    return response.json(estatisticas);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /corretoras/:id - Buscar corretora por ID
corretorasRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const corretora = await corretorasService.findById(Number(id));
    return response.json(corretora);
  } catch (error: any) {
    if (error.statusCode === 404) {
      return response.status(404).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /corretoras/:id/resumo - Resumo de lançamentos da corretora
corretorasRouter.get('/:id/resumo', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const resumo = await corretorasService.getResumoLancamentos(Number(id));
    return response.json(resumo);
  } catch (error: any) {
    if (error.statusCode === 404) {
      return response.status(404).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /corretoras - Criar nova corretora
corretorasRouter.post('/', async (request: Request, response: Response) => {
  try {
    const corretora = await corretorasService.create(request.body);
    return response.status(201).json(corretora);
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT /corretoras/:id - Atualizar corretora
corretorasRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const corretora = await corretorasService.update(Number(id), request.body);
    return response.json(corretora);
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE /corretoras/:id - Excluir corretora
corretorasRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await corretorasService.delete(Number(id));
    return response.status(204).send();
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default corretorasRouter;
