import { Request, Response } from 'express';
import TeamServices from '../services/TeamServices';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamServices(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const ServiceResponse = await this.teamService.getAll();
    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const ServiceResponse = await this.teamService.getById(Number(id));

    if (ServiceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }

    return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }
}
