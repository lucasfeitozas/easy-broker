import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'acoes',
  synchronize: true, // Temporariamente true para criar as tabelas
  logging: ['query', 'error', 'schema', 'warn', 'info', 'log'], // Logging completo
  entities:
    process.env.NODE_ENV === 'production'
      ? [
          `${__dirname}/../models/TipoAcoes.js`,
          `${__dirname}/../models/Acoes.js`,
          `${__dirname}/../models/Corretoras.js`,
          `${__dirname}/../models/Lancamentos.js`,
        ]
      : ['src/models/*.ts'],
  migrations:
    process.env.NODE_ENV === 'production'
      ? [`${__dirname}/migrations/*.js`]
      : ['src/database/migrations/*.ts'],
  subscribers:
    process.env.NODE_ENV === 'production'
      ? [`${__dirname}/subscribers/*.js`]
      : ['src/database/subscribers/*.ts'],
});

let isInitialized = false;

export const initializeDatabase = async () => {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Data Source has been initialized!');
      isInitialized = true;
    } catch (err) {
      console.error('Error during Data Source initialization', err);
      throw err;
    }
  }
  return AppDataSource;
};
