import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import ITeam from '../Interfaces/Teams/ITeam';
import TeamModel from '../models/TeamModel';

export default class TeamServices {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    }

    return { status: 'SUCCESSFUL', data: team };
  }
}
