import { Request, Response } from 'express';
import MatchService from '../services/MatchServices';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response) {
    const ServiceResponse = await this.matchService.getAll();

    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }

  public async getMatchById(req: Request, res: Response) {
    const { id } = req.params;

    const ServiceResponse = await this.matchService.getById(Number(id));

    if (ServiceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }

    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }

  public async getMatchProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    const isInProgress = inProgress === 'true';
    const ServiceResponse = await this.matchService.getMatchesByProgress(isInProgress);

    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const ServiceResponse = await this.matchService.finishMatch(Number(id));

    if (ServiceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }

    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const ServiceResponse = await this.matchService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    if (ServiceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }

    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const newMatch = req.body;
    const ServiceResponse = await this.matchService.createMatch(newMatch);

    if (ServiceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }

    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }
}
