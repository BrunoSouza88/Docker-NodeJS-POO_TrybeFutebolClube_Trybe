import { Request, Response } from 'express';
import LeaderboardServiceHome from '../services/LeaderboardservicesHome';
import LeaderboardServiceAway from '../services/LeaderboardServicesAway';

export default class LeaderboardController {
  constructor(
    private leaderboardServiceHome = new LeaderboardServiceHome(),
    private leaderboardServiceAway = new LeaderboardServiceAway(),
  ) {}

  public async showLeaderBoard(req: Request, res: Response) {
    const result = await this.leaderboardServiceHome.getHomeMatchesPoints();

    return res.status(200).json(result);
  }

  public async showLeaderBoardAway(req: Request, res: Response) {
    const result = await this.leaderboardServiceAway.getAwayMatchesPoints();

    return res.status(200).json(result);
  }
}
