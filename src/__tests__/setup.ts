import { DataSource } from 'typeorm';
import TipoAcoes from '../models/TipoAcoes';
import Corretoras from '../models/Corretoras';
import Acoes from '../models/Acoes';
import Lancamentos from '../models/Lancamentos';

let dataSourceInstance: DataSource | null = null;

export const getTestDataSource = (): DataSource => {
  if (!dataSourceInstance) {
    throw new Error('Test DataSource not initialized');
  }
  return dataSourceInstance;
};

beforeAll(async () => {
  // Configurar banco de dados de teste com SQLite em memória
  dataSourceInstance = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: false,
    entities: [TipoAcoes, Corretoras, Acoes, Lancamentos],
  });

  await dataSourceInstance.initialize();
});

afterAll(async () => {
  if (dataSourceInstance?.isInitialized) {
    await dataSourceInstance.destroy();
  }
});

export const testDataSource = getTestDataSource;
