import { Router } from 'express';
import tipoAcoesRouter from './tipoAcoes.routes';

const routes = Router();
routes.use('/tipo-acoes', tipoAcoesRouter);

export default routes;
