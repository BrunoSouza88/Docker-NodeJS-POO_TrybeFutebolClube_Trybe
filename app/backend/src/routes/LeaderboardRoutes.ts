import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) =>
  leaderboardController.showLeaderBoardHome(req, res));

router.get('/away', (req: Request, res: Response) =>
  leaderboardController.showLeaderBoardAway(req, res));

router.get('/', (req: Request, res: Response) =>
  leaderboardController.showLeaderBoard(req, res));

export default router;
