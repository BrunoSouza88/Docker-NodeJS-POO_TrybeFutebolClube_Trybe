import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/Matchs/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/Matchs/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAll(): Promise<ServiceResponse<IMatch[]>> {
    const AllMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: AllMatches };
  }

  public async getById(id: number): Promise<ServiceResponse<IMatch>> {
    const oneMatch = await this.matchModel.findById(id);

    if (!oneMatch) {
      return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    }

    return { status: 'SUCCESSFUL', data: oneMatch };
  }

  public async getMatchesByProgress(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    const filteredMatches = allMatches.filter((match) => match.inProgress === inProgress);
    return { status: 'SUCCESSFUL', data: filteredMatches };
  }
}
