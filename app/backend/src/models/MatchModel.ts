import SequelizeMatch from '../database/models/SequelizeMatch';
import IMatch from '../Interfaces/Matchs/IMatch';
import { IMatchModel } from '../Interfaces/Matchs/IMatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { NewEntity } from '../Interfaces';

export default class MatchModel implements IMatchModel {
  private matchModel = SequelizeMatch;
  private teamModel = SequelizeTeam;

  public async findAll(): Promise<IMatch[]> {
    const allMatches = await this.matchModel.findAll();
    const allTeams = await this.teamModel.findAll();

    return allMatches.map(({
      id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress,
    }) => {
      const homeTeam = allTeams.find((element) => element.id === homeTeamId);
      const awayTeam = allTeams.find((element) => element.id === awayTeamId);

      return {
        id,
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress,
        homeTeam: homeTeam ? { teamName: homeTeam.teamName } : null,
        awayTeam: awayTeam ? { teamName: awayTeam.teamName } : null,
      };
    });
  }

  public async findById(idx: number): Promise<IMatch | null> {
    const oneMatch = await this.matchModel.findByPk(idx);
    if (!oneMatch) return null;
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = oneMatch;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  public async finishMath(id: number): Promise<void> {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async create(newMatch: NewEntity<IMatch>): Promise<IMatch> {
    const dbData = await this.matchModel.create(newMatch);

    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
