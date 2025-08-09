import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import TipoAcoes from '../models/TipoAcoes';

export const TipoAcoesRepository = AppDataSource.getRepository(TipoAcoes);
export default TipoAcoesRepository;
