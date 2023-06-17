// import IMatch from '../Interfaces/Matchs/IMatch';
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
  private goalsOwn = 0;
  private goalsBalanceTotal = 0;
  private allMatchesPrivate: matchDetailHome[] = [];
  private sortedLeaderboard: responseType[] = [];
  private totalPointsSum = 0;

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
    const allMatches = allMatchesData
      .filter((el) => el.homeTeamId === homeTeamId);

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
    const allMatches = allMatchesData
      .filter((el) => el.homeTeamId === homeTeamId);
    this.allMatchesPrivate = [];
    console.log(allMatches);
    allMatches.forEach((el) => {
      if (el.inProgress === false) {
        this.allMatchesPrivate = allMatches;
        return this.allMatchesPrivate.length;
      }
    });
    this.allMatchesPrivate = [];
    this.allMatchesPrivate = allMatches;

    return this.allMatchesPrivate.length;
  }

  private calculateTotalVictories(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData
      .filter((el) => el.homeTeamId === homeTeamId);

    this.totalVictories = 0;

    allMatches.forEach((el) => {
      if (el.homeTeamGoals > el.awayTeamGoals) {
        this.totalVictories += 1;
      }
    });

    return this.totalVictories;
  }

  private calculateTotalDraws(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData
      .filter((el) => el.homeTeamId === homeTeamId);

    this.totalDraws = 0;

    allMatches.forEach((el) => {
      if (el.homeTeamGoals === el.awayTeamGoals) {
        this.totalDraws += 1;
      }
    });

    return this.totalDraws;
  }

  private calculateTotalLosses(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData
      .filter((el) => el.homeTeamId === homeTeamId);

    this.totalLosses = 0;

    allMatches.forEach((el) => {
      if (el.homeTeamGoals < el.awayTeamGoals) {
        this.totalLosses += 1;
      }
    });

    return this.totalLosses;
  }

  private calculateGoalsFavor(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData
      .filter((el) => el.homeTeamId === homeTeamId);

    this.goalsFavor = 0;

    allMatches.forEach((el) => {
      this.goalsFavor += el.homeTeamGoals;
    });

    return this.goalsFavor;
  }

  private calculateGoalsOwn(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData
      .filter((el) => el.homeTeamId === homeTeamId);

    this.goalsOwn = 0;

    allMatches.forEach((el) => {
      this.goalsOwn += el.awayTeamGoals;
    });

    return this.goalsOwn;
  }

  private calculateGoalsBalance(goalsFavor: number, goalsOwn: number) {
    this.goalsBalanceTotal = goalsFavor - goalsOwn;
    return this.goalsBalanceTotal;
  }

  private calculateEfficiency(homeTeamId: number, allMatchesData: matchDetailHome[]) {
    const allMatches = allMatchesData
      .filter((el) => el.homeTeamId === homeTeamId);
    const totalMatches = allMatches.length;

    this.totalPointsSum = 0;

    allMatches.forEach((el) => {
      if (el.homeTeamGoals > el.awayTeamGoals) {
        this.totalPointsSum += 3;
      } else if (el.homeTeamGoals === el.awayTeamGoals) {
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
