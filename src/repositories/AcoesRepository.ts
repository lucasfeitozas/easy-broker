import { EntityRepository, Repository } from 'typeorm';
import Acoes from '../models/Acoes';

@EntityRepository(Acoes)
class AcoesRepository extends Repository<Acoes> {}

export default AcoesRepository;
