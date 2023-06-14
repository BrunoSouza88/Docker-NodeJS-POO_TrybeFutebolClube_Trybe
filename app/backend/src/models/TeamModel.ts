import ITeam from '../Interfaces/Teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(idx: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(idx);
    if (dbData == null) {
      return null;
    }

    const { id, teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
