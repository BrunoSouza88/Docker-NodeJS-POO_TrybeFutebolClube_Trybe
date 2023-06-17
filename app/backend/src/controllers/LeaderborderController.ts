import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboardservices';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async showLeaderBoard(req: Request, res: Response) {
    const result = await this.leaderboardService.getHomeMatchesPoints();

    return res.status(200).json(result);
  }
}
