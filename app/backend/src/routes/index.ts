import { Router } from 'express';
import teamsRouter from './teamRoutes';

const router = Router();

router.use('/teams', teamsRouter);

export default router;
