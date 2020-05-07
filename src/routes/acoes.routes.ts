import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import AcoesRepository from '../repositories/AcoesRepository';

const acoesRouter = Router();

acoesRouter.get('/', async (request, response) => {
  const acoesRepository = getCustomRepository(AcoesRepository);

  const acoes = await acoesRepository.find();

  return response.json(acoes);
});

export default acoesRouter;
