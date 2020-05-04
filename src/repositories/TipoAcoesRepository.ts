import { EntityRepository, Repository } from 'typeorm';
import TipoAcoes from '../models/TipoAcoes';

@EntityRepository(TipoAcoes)
class TipoAcoesRepository extends Repository<TipoAcoes> {}
export default TipoAcoesRepository;
