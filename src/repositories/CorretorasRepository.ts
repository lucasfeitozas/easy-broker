import { EntityRepository, Repository } from 'typeorm';
import Corretoras from '../models/Corretoras';

@EntityRepository(Corretoras)
class CorretorasRepository extends Repository<Corretoras> {}

export default CorretorasRepository;
