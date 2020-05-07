import { EntityRepository, Repository } from 'typeorm';
import Lancamentos from '../models/Lancamentos';

@EntityRepository(Lancamentos)
class LancamentosRepository extends Repository<Lancamentos> {}

export default LancamentosRepository;
