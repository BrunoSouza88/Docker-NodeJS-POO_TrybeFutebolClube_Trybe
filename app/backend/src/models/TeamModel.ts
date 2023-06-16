import ITeam from '../Interfaces/Teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private teamModel = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const allTeams = await this.teamModel.findAll();
    return allTeams.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(idx: number): Promise<ITeam | null> {
    const oneTeam = await this.teamModel.findByPk(idx);
    if (!oneTeam) return null;
    const { id, teamName }: ITeam = oneTeam;
    return { id, teamName };
  }
}
