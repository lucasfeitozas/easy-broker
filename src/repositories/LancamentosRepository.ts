import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import Lancamentos from '../models/Lancamentos';

export const LancamentosRepository = AppDataSource.getRepository(Lancamentos);
export default LancamentosRepository;
