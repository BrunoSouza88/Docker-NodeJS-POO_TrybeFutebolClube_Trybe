export interface ICRUDModelWReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}

export interface ICRUDModelWCheck {
  finishMath(id: number): Promise<void>,
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
}

export interface ICRUDMatchWCreate<T> {
  create(data: Partial<T>): Promise<T>;
}

export interface ICRUDMatchWModel<T>
  extends ICRUDModelWReader<T>, ICRUDMatchWCreate<T>, ICRUDModelWCheck {}
