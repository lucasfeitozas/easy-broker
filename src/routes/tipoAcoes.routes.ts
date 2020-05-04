import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import TipoAcoesRepository from '../repositories/TipoAcoesRepository';

// not implemented yet @lucas.af TODO
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const tipoAcoesRouter = Router();
// tipoAcoesRouter.use(ensureAuthenticated);

// SoC: Separation of Concerns (separacao de preocupacoes)
tipoAcoesRouter.get('/', async (request, response) => {
  const tipoAcoesRepository = getCustomRepository(TipoAcoesRepository);
  const tipoAcoes = await tipoAcoesRepository.find();
  return response.json(tipoAcoes);
});

export default tipoAcoesRouter;
