import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import Corretoras from '../models/Corretoras';

export const CorretorasRepository = AppDataSource.getRepository(Corretoras);
export default CorretorasRepository;
