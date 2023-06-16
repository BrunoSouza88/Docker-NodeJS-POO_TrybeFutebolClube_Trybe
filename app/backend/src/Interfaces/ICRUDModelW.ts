export interface ICRUDModelWReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}

export interface ICRUDModelWCheck {
  finishMath(id: number): Promise<void>,
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
}

export interface ICRUDMatchWModel<T> extends ICRUDModelWReader<T>, ICRUDModelWCheck {}
