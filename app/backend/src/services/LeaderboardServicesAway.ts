import { matchDetailAway, responseType } from '../Interfaces/Leaderboard/ILeaderboard';
import { IMatchModel } from '../Interfaces/Matchs/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class LeaderboardServiceAway {
  private totalPoints = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private goalsBalanceTotal = 0;
  private allMatchesPrivate: matchDetailAway[] = [];
  private totalPointsSum = 0;
  private sortedResponse: responseType[] = [];

  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  private async calculateTotalPoints(awayTeamId: number, allMatchesData: matchDetailAway[]) {
    const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

    allGames.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        this.totalPoints += 3;
      } else if (match.awayTeamGoals === match.homeTeamGoals) {
        this.totalPoints += 1;
      }
    });

    return this.totalPoints;
  }

  private async calculateTotalGames(awayTeamId: number, allMatchesData: matchDetailAway[]) {
    const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

    this.allMatchesPrivate = allGames;
    return this.allMatchesPrivate.length;
  }

  private async calculateTotalVictories(awayTeamId: number, allMatchesData: matchDetailAway[]) {
    const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

    allGames.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        this.totalVictories += 1;
      }
    });

    return this.totalVictories;
  }

  private async calculateTotalDraws(awayTeamId: number, allMatchesData: matchDetailAway[]) {
    const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

    allGames.forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        this.totalDraws += 1;
      }
    });

    return this.totalDraws;
  }

  private async calculateTotalLosses(awayTeamId: number, allMatchesData: matchDetailAway[]) {
    const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

    allGames.forEach((match) => {
      if (match.awayTeamGoals < match.homeTeamGoals) {
        this.totalLosses += 1;
      }
    });

    return this.totalLosses;
  }

  private async calculateGoalsFavor(awayTeamId: number, allMatchesData: matchDetailAway[]) {
    const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

    allGames.forEach((match) => {
      this.goalsFavor += match.awayTeamGoals;
    });

    return this.goalsFavor;
  }

  private async calculateGoalsOwn(awayTeamId: number, allMatchesData: matchDetailAway[]) {
    const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

    allGames.forEach((match) => {
      this.goalsOwn += match.homeTeamGoals;
    });

    return this.goalsOwn;
  }

  private async calculateGoalsBalance(goalsFavor: number, goalsOwn: number) {
    this.goalsBalanceTotal = goalsFavor - goalsOwn;
    return this.goalsBalanceTotal;
  }

  private async calculateEfficiency(awayTeamId: number, allMatchesData: matchDetailAway[]) {
    const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);
    const totalGames = allGames.length;

    allGames.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        this.totalPointsSum += 3;
      } else if (match.awayTeamGoals === match.homeTeamGoals) {
        this.totalPointsSum += 1;
      }
    });

    const efficiency = (this.totalPointsSum / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  private async sortLeaderboard(object: responseType[]) {
    this.sortedResponse = object.sort((a, b) => {
      const victoryCount = b.totalVictories - a.totalVictories;
      if (victoryCount !== 0) {
        return victoryCount;
      }

      const goalsBalanceCount = b.goalsBalance - a.goalsBalance;
      if (goalsBalanceCount !== 0) {
        return goalsBalanceCount;
      }

      const goalsFavorCount = b.goalsFavor - a.goalsFavor;
      return goalsFavorCount;
    });

    return this.sortedResponse;
  }

  public async getAllTeams() {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public async getAllMatches() {
    const allMatches = await this.matchModel.findAll();
    return allMatches;
  }

  public async getAwayMatchesPoints() {
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
