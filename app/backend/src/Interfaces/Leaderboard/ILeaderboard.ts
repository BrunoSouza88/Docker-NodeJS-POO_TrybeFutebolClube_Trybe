export type matchDetailHome = {
  id: number,
  homeTeamId: number,
  awayTeamGoals: number,
  homeTeamGoals: number,
  inProgress:boolean,
};

export type matchDetailAway = {
  id: number,
  awayTeamId: number,
  awayTeamGoals: number,
  homeTeamGoals: number,
  inProgress:boolean,
};

export type matchDetail = {
  id: number,
  awayTeamId: number,
  homeTeamId: number,
  awayTeamGoals: number,
  homeTeamGoals: number,
  inProgress:boolean,
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
