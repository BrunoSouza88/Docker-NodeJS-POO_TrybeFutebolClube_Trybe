import { Request, Response } from 'express';
import LeaderboardServiceHome from '../services/LeaderboardservicesHome';
import LeaderboardServiceAway from '../services/LeaderboardServicesAway';
import LeaderBoardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardServiceHome = new LeaderboardServiceHome(),
    private leaderboardServiceAway = new LeaderboardServiceAway(),
    private leaderboardService = new LeaderBoardService(),
  ) {}

  public async showLeaderBoardHome(_req: Request, res: Response) {
    const result = await this.leaderboardServiceHome.leaderboardResult();

    return res.status(200).json(result);
  }

  public async showLeaderBoardAway(_req: Request, res: Response) {
    const result = await this.leaderboardServiceAway.leaderboardResult();

    return res.status(200).json(result);
  }

  public async showLeaderBoard(_req: Request, res: Response) {
    const result = await this.leaderboardService.leaderboardResult();

    return res.status(200).json(result);
  }
}
