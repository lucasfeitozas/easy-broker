import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import LancamentosRepository from '../repositories/LancamentosRepository';

const lancamentosRouter = Router();

lancamentosRouter.get('/', async (request, response) => {
  const lancamentosRepository = getCustomRepository(LancamentosRepository);

  const lancamentos = await lancamentosRepository.find();

  return response.json(lancamentos);
});

export default lancamentosRouter;
