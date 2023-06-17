// import IMatch from '../Interfaces/Matchs/IMatch';
import { matchDetail, responseType } from '../Interfaces/Leaderboard/ILeaderboard';
import { IMatchModel } from '../Interfaces/Matchs/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class LeaderboardServiceHome {
  private totalPoints = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private goalsBalanceTotal = 0;
  private allMatchesPrivate: matchDetail[] = [];
  private totalPointsSum = 0;
  private sortedResponse: responseType[] = [];

  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllTeams() {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public async getAllMatches() {
    const allMatches = await this.matchModel.findAll();
    return allMatches;
  }

  public async calculateTotalPoints(homeTeamId: number, allMatchesData: matchDetail[]) {
    const allMatches = await allMatchesData.filter((el) => el.homeTeamId === homeTeamId);

    allMatches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        this.totalPoints += 3;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        this.totalPoints += 1;
      }
    });

    return this.totalPoints;
  }

  public async calculateTotalGames(homeTeamId: number, allMatchesData: matchDetail[]) {
    const allMatches = await allMatchesData.filter((ele) => ele.homeTeamId === homeTeamId);

    this.allMatchesPrivate = allMatches;
    return this.allMatchesPrivate.length;
  }

  public async calculateTotalVictories(homeTeamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

    allMatches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        this.totalVictories += 1;
      }
    });

    return this.totalVictories;
  }

  public async calculateTotalDraws(homeTeamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

    allMatches.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        this.totalDraws += 1;
      }
    });

    return this.totalDraws;
  }

  public async calculateTotalLosses(homeTeamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

    allMatches.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        this.totalLosses += 1;
      }
    });

    return this.totalLosses;
  }

  public async calculateGoalsFavor(homeTeamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

    allMatches.forEach((match) => {
      this.goalsFavor += match.homeTeamGoals;
    });

    return this.goalsFavor;
  }

  public async calculateGoalsOwn(homeTeamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

    allMatches.forEach((match) => {
      this.goalsOwn += match.awayTeamGoals;
    });

    return this.goalsOwn;
  }

  public async calculateGoalsBalance(goalsFavor: number, goalsOwn: number) {
    this.goalsBalanceTotal = goalsFavor - goalsOwn;
    return this.goalsBalanceTotal;
  }

  public async calculateEfficiency(homeTeamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);
    const totalMatches = allMatches.length;

    allMatches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        this.totalPointsSum += 3;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        this.totalPointsSum += 1;
      }
    });

    const efficiency = (this.totalPointsSum / (totalMatches * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  public async sortLeaderboard(object: responseType[]) {
    this.sortedResponse = object.sort((a, b) => {
      const victoryCount = b.totalVictories - a.totalVictories;
      if (victoryCount !== 0) {
        return victoryCount;
      }

      const goalsCount = b.goalsFavor - a.goalsFavor;
      if (goalsCount !== 0) {
        return goalsCount;
      }

      const goalsBalanceCount = b.goalsBalance - a.goalsBalance;
      return goalsBalanceCount;
    });

    return this.sortedResponse;
  }

  public async getHomeMatchesPoints() {
    const allTeams = await this.getAllTeams();
    const allMatches = await this.getAllMatches();
    const allData = allMatches.map((el) => el);
    const objectPromises = allTeams.map(async (el) => ({
      name: el.teamName,
      totalPoints: await this.calculateTotalPoints(el.id, allData),
      totalGames: await this.calculateTotalGames(el.id, allData),
      totalVictories: await this.calculateTotalVictories(el.id, allData),
      totalDraws: await this.calculateTotalDraws(el.id, allData),
      totalLosses: await this.calculateTotalLosses(el.id, allData),
      goalsFavor: await this.calculateGoalsFavor(el.id, allData),
      goalsOwn: await this.calculateGoalsOwn(el.id, allData),
      goalsBalance: await this.calculateGoalsBalance(await this
        .calculateGoalsFavor(el.id, allData), await this.calculateGoalsOwn(el.id, allData)),
      efficiency: await this.calculateEfficiency(el.id, allData),
    }));

    const leaderBoard = await Promise.all(objectPromises);
    return this.sortLeaderboard(leaderBoard);
  }
}
