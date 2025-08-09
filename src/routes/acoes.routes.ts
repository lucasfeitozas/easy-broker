import { Router, Request, Response } from 'express';
import AcoesService from '../services/AcoesService';

const acoesRouter = Router();
const acoesService = new AcoesService();

// GET /acoes - Listar todas as ações
acoesRouter.get('/', async (request: Request, response: Response) => {
  try {
    const acoes = await acoesService.findAll();
    return response.json(acoes);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /acoes/search - Buscar ações por termo
acoesRouter.get('/search', async (request: Request, response: Response) => {
  try {
    const { termo } = request.query;
    const acoes = await acoesService.search(termo as string);
    return response.json(acoes);
  } catch (error) {
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /acoes/estatisticas - Estatísticas das ações
acoesRouter.get(
  '/estatisticas',
  async (request: Request, response: Response) => {
    try {
      const estatisticas = await acoesService.getEstatisticas();
      return response.json(estatisticas);
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
);

// GET /acoes/tipo/:tipoId - Buscar ações por tipo
acoesRouter.get(
  '/tipo/:tipoId',
  async (request: Request, response: Response) => {
    try {
      const { tipoId } = request.params;
      const acoes = await acoesService.findByTipoAcao(Number(tipoId));
      return response.json(acoes);
    } catch (error: any) {
      if (error.statusCode === 404) {
        return response.status(404).json({ error: error.message });
      }
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
);

// GET /acoes/:id - Buscar ação por ID
acoesRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const acao = await acoesService.findById(Number(id));
    return response.json(acao);
  } catch (error: any) {
    if (error.statusCode === 404) {
      return response.status(404).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /acoes/ticker/:ticker - Buscar ação por ticker
acoesRouter.get(
  '/ticker/:ticker',
  async (request: Request, response: Response) => {
    try {
      const { ticker } = request.params;
      const acao = await acoesService.findByTicker(ticker);
      return response.json(acao);
    } catch (error: any) {
      if (error.statusCode === 404) {
        return response.status(404).json({ error: error.message });
      }
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
);

// POST /acoes - Criar nova ação
acoesRouter.post('/', async (request: Request, response: Response) => {
  try {
    const acao = await acoesService.create(request.body);
    return response.status(201).json(acao);
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT /acoes/:id - Atualizar ação
acoesRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const acao = await acoesService.update(Number(id), request.body);
    return response.json(acao);
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE /acoes/:id - Excluir ação
acoesRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await acoesService.delete(Number(id));
    return response.status(204).send();
  } catch (error: any) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default acoesRouter;
