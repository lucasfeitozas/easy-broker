import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import Acoes from '../models/Acoes';

export const AcoesRepository = AppDataSource.getRepository(Acoes);
export default AcoesRepository;
