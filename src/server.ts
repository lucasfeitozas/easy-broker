import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors'; // pacote importado para possibilitar tratamento global de errors em rotas com async
import AppError from './errors/AppError';
import routes from './routes';
import { initializeDatabase } from './database';

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/files', express.static(uploadConfig.directory));

// Health check endpoint
app.get('/health', (request: Request, response: Response) => {
  return response.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// Inicializar banco e depois iniciar servidor
async function startServer() {
  try {
    await initializeDatabase();
    const port = process.env.PORT || 3333;
    app.listen(port, () => {
      console.log(`🚀 Server started on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
