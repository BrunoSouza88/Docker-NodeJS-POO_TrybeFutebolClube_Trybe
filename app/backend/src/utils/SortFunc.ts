import { responseType } from '../Interfaces/Leaderboard/ILeaderboard';

/* eslint-disable max-lines-per-function */
export default class Sorteams {
  // eslint-disable-next-line class-methods-use-this
  public async sortResponse(object: responseType[]) {
    const compare = (value: number): 0 | 1 | -1 => {
      if (value > 0) {
        return -1;
      } if (value < 0) {
        return 1;
      }
      return 0;
    };

    object.sort((a, b) => {
      const victoryCount = b.totalVictories - a.totalVictories;
      if (victoryCount !== 0) {
        return compare(victoryCount);
      }

      const goalsCount = b.goalsFavor - a.goalsFavor;
      if (goalsCount !== 0) {
        return compare(goalsCount);
      }

      const goalsAgainstCount = a.goalsOwn - b.goalsOwn;
      return compare(goalsAgainstCount);
    });
    object.sort((a, b) => compare(b.totalPoints - a.totalPoints));

    return object;
  }
}
