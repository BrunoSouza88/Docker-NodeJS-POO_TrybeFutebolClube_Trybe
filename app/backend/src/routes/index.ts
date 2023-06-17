import { Router } from 'express';
import teamsRouter from './teamRoutes';
import userRouter from './userRoutes';
import matchRouter from './matchRoutes';
import leaderboardRouter from './LeaderboardRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
