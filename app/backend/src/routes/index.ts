import { Router } from 'express';
import teamsRouter from './teamRoutes';
import userRouter from './userRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);

export default router;
