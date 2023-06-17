import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderborderController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) =>
  leaderboardController.showLeaderBoard(req, res));

export default router;
