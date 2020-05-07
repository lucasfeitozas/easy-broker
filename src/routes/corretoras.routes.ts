import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import CorretorasRepository from '../repositories/CorretorasRepository';

const corretorasRouter = Router();

corretorasRouter.get('/', async (request, response) => {
  const corretorasRepository = getCustomRepository(CorretorasRepository);

  const corretoras = await corretorasRepository.find();

  return response.json(corretoras);
});

export default corretorasRouter;
