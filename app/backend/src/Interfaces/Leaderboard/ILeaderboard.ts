export type matchDetail = {
  id: number,
  homeTeamId: number,
  awayTeamGoals: number,
  homeTeamGoals: number,
};

export type matchDetailAway = {
  id: number,
  awayTeamId: number,
  awayTeamGoals: number,
  homeTeamGoals: number,
};

export type responseType = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};
