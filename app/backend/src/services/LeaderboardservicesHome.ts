import { matchDetailHome, responseType } from '../Interfaces/Leaderboard/ILeaderboard';
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
  private goalsTaken = 0;
  private goalsBalanceTotal = 0;
  private allMatchesPrivate: matchDetailHome[] = [];
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

  private calculateTotalPoints(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData.filter((el) => el.homeTeamId === homeTeamId);

    this.totalPoints = 0;

    allMatches.forEach((el) => {
      if (el.homeTeamGoals > el.awayTeamGoals && !el.inProgress) {
        this.totalPoints += 3;
      } else if (el.homeTeamGoals === el.awayTeamGoals && !el.inProgress) {
        this.totalPoints += 1;
      }
    });

    return this.totalPoints;
  }

  private calculateTotalGames(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData.filter((el) => el.homeTeamId === homeTeamId);

    this.allMatchesPrivate = allMatches.filter((el) => el.inProgress === false);
    return this.allMatchesPrivate.length;
  }

  private calculateTotalVictories(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData.filter((el) => el.homeTeamId === homeTeamId);

    this.totalVictories = 0;

    allMatches.forEach((el) => {
      if (el.homeTeamGoals > el.awayTeamGoals && !el.inProgress) {
        this.totalVictories += 1;
      }
    });

    return this.totalVictories;
  }

  private calculateTotalDraws(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData.filter((el) => el.homeTeamId === homeTeamId);

    this.totalDraws = 0;

    allMatches.forEach((el) => {
      if (el.homeTeamGoals === el.awayTeamGoals && !el.inProgress) {
        this.totalDraws += 1;
      }
    });

    return this.totalDraws;
  }

  private calculateTotalLosses(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData.filter((el) => el.homeTeamId === homeTeamId);

    this.totalLosses = 0;

    allMatches.forEach((el) => {
      if (el.homeTeamGoals < el.awayTeamGoals && !el.inProgress) {
        this.totalLosses += 1;
      }
    });

    return this.totalLosses;
  }

  private calculateGoalsFavor(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData.filter((el) => el.homeTeamId === homeTeamId);

    this.goalsFavor = 0;

    allMatches.forEach((el) => {
      if (!el.inProgress) {
        this.goalsFavor += el.homeTeamGoals;
      }
    });

    return this.goalsFavor;
  }

  private calculateGoalsTaken(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData.filter((el) => el.homeTeamId === homeTeamId);

    this.goalsTaken = 0;

    allMatches.forEach((el) => {
      if (!el.inProgress) {
        this.goalsTaken += el.awayTeamGoals;
      }
    });

    return this.goalsTaken;
  }

  private calculateGoalsBalance(goalsFavor: number, goalsOwn: number) {
    this.goalsBalanceTotal = goalsFavor - goalsOwn;
    return this.goalsBalanceTotal;
  }

  private calculateEfficiency(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData.filter((el) => el.homeTeamId === homeTeamId
    && !el.inProgress);
    const totalMatches = allMatches.length;

    this.totalPointsSum = 0;

    allMatches.forEach((el) => {
      if (el.homeTeamGoals > el.awayTeamGoals) {
        this.totalPointsSum += 3;
      } else if (el.homeTeamGoals === el.awayTeamGoals) {
        this.totalPointsSum += 1;
      }
    });

    const efficiency = (this.totalPointsSum / (totalMatches * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  private sortLeaderboard(object: responseType[]) {
    this.sortedLeaderboard = object.sort((a, b) => {
      const pointsCount = b.totalPoints - a.totalPoints;
      if (pointsCount) return pointsCount;

      const victoriesCount = b.totalVictories - a.totalVictories;
      if (victoriesCount) return victoriesCount;

      const goalsBalanceCount = b.goalsBalance - a.goalsBalance;
      if (goalsBalanceCount) return goalsBalanceCount;

      const goalsCount = b.goalsFavor - a.goalsFavor;
      return goalsCount;
    });

    return this.sortedLeaderboard.map((item) => ({
      ...item,
      efficiency: item.efficiency.toFixed(2),
    }));
  }

  public async leaderboardResult() {
    const allTeams = await this.getAllTeams();
    const objectPromises = allTeams.map(async (el) => ({
      name: el.teamName,
      totalPoints: this.calculateTotalPoints(el.id, await this.getAllMatches()),
      totalGames: this.calculateTotalGames(el.id, await this.getAllMatches()),
      totalVictories: this.calculateTotalVictories(el.id, await this.getAllMatches()),
      totalDraws: this.calculateTotalDraws(el.id, await this.getAllMatches()),
      totalLosses: this.calculateTotalLosses(el.id, await this.getAllMatches()),
      goalsFavor: this.calculateGoalsFavor(el.id, await this.getAllMatches()),
      goalsOwn: this.calculateGoalsTaken(el.id, await this.getAllMatches()),
      goalsBalance: this.calculateGoalsBalance(
        this.calculateGoalsFavor(el.id, await this.getAllMatches()),
        this.calculateGoalsTaken(el.id, await this.getAllMatches()),
      ),
      efficiency: this.calculateEfficiency(el.id, await this.getAllMatches()),
    }));

    const leaderBoard = await Promise.all(objectPromises);
    return this.sortLeaderboard(leaderBoard);
  }
}
