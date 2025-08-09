import { DataSource } from 'typeorm';
import TipoAcoes from '../models/TipoAcoes';
import Corretoras from '../models/Corretoras';
import Acoes from '../models/Acoes';
import Lancamentos from '../models/Lancamentos';

export let testDataSource: DataSource;

beforeAll(async () => {
  // Configurar banco de dados de teste com SQLite em memória
  testDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: false,
    entities: [TipoAcoes, Corretoras, Acoes, Lancamentos],
  });

  await testDataSource.initialize();
});

afterAll(async () => {
  if (testDataSource?.isInitialized) {
    await testDataSource.destroy();
  }
});

export { testDataSource as AppDataSource };
