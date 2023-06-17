import TeamModel from '../models/TeamModel';
import { matchDetail, responseType } from '../Interfaces/Leaderboard/ILeaderboard';
import MatchModel from '../models/MatchModel';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import { IMatchModel } from '../Interfaces/Matchs/IMatchModel';

export default class leaderBoardService {
  private totalPoints = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private goalsBalanceTotal = 0;
  private allMatchesPrivate: matchDetail[] = [];
  private totalPointsSum = 0;
  private sortedLeaderboard: responseType[] = [];

  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  private async getAllTeams() {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  private async getAllMatches() {
    const allMatches = await this.matchModel.findAll();
    return allMatches;
  }

  private calculateTotalPoints(teamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData
      .filter((el) => el.awayTeamId === teamId || el.homeTeamId === teamId);

    this.totalPoints = 0;

    allMatches.forEach((el) => {
      if ((el.awayTeamId === teamId && el.awayTeamGoals > el.homeTeamGoals)
      || (el.homeTeamId === teamId && el.homeTeamGoals > el.awayTeamGoals)) {
        this.totalPoints += 3;
      }
      if ((el.awayTeamId === teamId || el.homeTeamId === teamId)
      && el.awayTeamGoals === el.homeTeamGoals) {
        this.totalPoints += 1;
      }
    });
    return this.totalPoints;
  }

  private calculateTotalGames(teamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData
      .filter((el) => el.awayTeamId === teamId || el.homeTeamId === teamId);
    this.allMatchesPrivate = allMatches;
    return this.allMatchesPrivate.length;
  }

  private calculateTotalVictories(teamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData
      .filter((el) => el.awayTeamId === teamId || el.homeTeamId === teamId);

    this.totalVictories = 0;

    allMatches.forEach((el) => {
      if ((el.awayTeamId === teamId && el.awayTeamGoals > el.homeTeamGoals)
      || (el.homeTeamId === teamId && el.homeTeamGoals > el.awayTeamGoals)) {
        this.totalVictories += 1;
      }
    });

    return this.totalVictories;
  }

  private calculateTotalDraws(teamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData
      .filter((el) => el.awayTeamId === teamId || el.homeTeamId === teamId);

    this.totalDraws = 0;

    allMatches.forEach((el) => {
      if ((el.awayTeamId === teamId && el.awayTeamGoals === el.homeTeamGoals)
      || (el.homeTeamId === teamId && el.awayTeamGoals === el.homeTeamGoals)) {
        this.totalDraws += 1;
      }
    });

    return this.totalDraws;
  }

  private calculateTotalLosses(teamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData
      .filter((el) => el.awayTeamId === teamId || el.homeTeamId === teamId);

    this.totalLosses = 0;

    allMatches.forEach((el) => {
      if ((el.awayTeamId === teamId && el.awayTeamGoals < el.homeTeamGoals)
    || (el.homeTeamId === teamId && el.homeTeamGoals < el.awayTeamGoals)) {
        this.totalLosses += 1;
      }
    });

    return this.totalLosses;
  }

  private calculateGoalsFavor(teamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData
      .filter((el) => el.awayTeamId === teamId || el.homeTeamId === teamId);

    this.goalsFavor = 0;

    allMatches.forEach((el) => {
      if (el.awayTeamId === teamId) {
        this.goalsFavor += el.awayTeamGoals;
      } else if (el.homeTeamId === teamId) {
        this.goalsFavor += el.homeTeamGoals;
      }
    });

    return this.goalsFavor;
  }

  private calculateGoalsOwn(teamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData
      .filter((el) => el.awayTeamId === teamId || el.homeTeamId === teamId);

    this.goalsOwn = 0;

    allMatches.forEach((el) => {
      if (el.awayTeamId === teamId) {
        this.goalsOwn += el.homeTeamGoals;
      } else if (el.homeTeamId === teamId) {
        this.goalsOwn += el.awayTeamGoals;
      }
    });

    return this.goalsOwn;
  }

  private calculateGoalsBalance(goalsFavor: number, goalsOwn: number) {
    this.goalsBalanceTotal = goalsFavor - goalsOwn;
    return this.goalsBalanceTotal;
  }

  private calculateEfficiency(teamId: number, allMatchesData: matchDetail[]) {
    const allMatches = allMatchesData
      .filter((el) => el.awayTeamId === teamId || el.homeTeamId === teamId);
    const totalMatches = allMatches.length;

    this.totalPointsSum = 0;

    allMatches.forEach((el) => {
      if ((el.awayTeamId === teamId && el.awayTeamGoals > el.homeTeamGoals)
        || (el.homeTeamId === teamId && el.homeTeamGoals > el.awayTeamGoals)) {
        this.totalPointsSum += 3;
      } else if (
        (el.awayTeamId === teamId || el.homeTeamId === teamId)
        && el.awayTeamGoals === el.homeTeamGoals) {
        this.totalPointsSum += 1;
      }
    });

    const efficiency = ((this.totalPointsSum / (totalMatches * 3)) * 100);
    return Number(efficiency.toFixed(2));
  }

  private sortLeaderboard(object: responseType[]) {
    this.sortedLeaderboard = object.sort((a, b) => {
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

    return this.sortedLeaderboard;
  }

  public async leaderboardResult() {
    const allTeams = await this.getAllTeams();
    const allMatches = await this.getAllMatches();
    const allData = allMatches;
    const objectPromises = allTeams.map((el) => ({
      name: el.teamName,
      totalPoints: this.calculateTotalPoints(el.id, allData),
      totalGames: this.calculateTotalGames(el.id, allData),
      totalVictories: this.calculateTotalVictories(el.id, allData),
      totalDraws: this.calculateTotalDraws(el.id, allData),
      totalLosses: this.calculateTotalLosses(el.id, allData),
      goalsFavor: this.calculateGoalsFavor(el.id, allData),
      goalsOwn: this.calculateGoalsOwn(el.id, allData),
      goalsBalance: this.calculateGoalsBalance(this
        .calculateGoalsFavor(el.id, allData), this.calculateGoalsOwn(el.id, allData)),
      efficiency: this.calculateEfficiency(el.id, allData),
    }));

    const leaderBoard = await Promise.all(objectPromises);
    return this.sortLeaderboard(leaderBoard);
  }
}
