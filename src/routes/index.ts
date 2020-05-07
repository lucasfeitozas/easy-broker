import { Router } from 'express';
import tipoAcoesRouter from './tipoAcoes.routes';
import acoesRouter from './acoes.routes';
import corretorasRouter from './corretoras.routes';
import lancamentosRouter from './lancamentos.routes';

const routes = Router();
routes.use('/tipo-acoes', tipoAcoesRouter);
routes.use('/acoes', acoesRouter);
routes.use('/corretoras', corretorasRouter);
routes.use('/lancamentos', lancamentosRouter);

export default routes;
