import { Router } from 'express';
import teamsRouter from './teamRoutes';
import userRouter from './userRoutes';
import matchRouter from './matchRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
