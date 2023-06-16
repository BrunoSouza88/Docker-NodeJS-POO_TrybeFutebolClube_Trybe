export interface ICRUDModelReader2<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}

export interface ICRUDModelWriter2 {
  finishedMatch(id: number): Promise<void>,
  updateMatch(id: number, awayTeamGoals: number, homeTeamGoals: number): Promise<void>,
}

export interface ICRUDModelCreate2<T> {
  create(data: Partial<T>): Promise<T>
}

export interface ICRUDModel<T>
  extends ICRUDModelReader2<T>, ICRUDModelCreate2<T>, ICRUDModelWriter2 {}
