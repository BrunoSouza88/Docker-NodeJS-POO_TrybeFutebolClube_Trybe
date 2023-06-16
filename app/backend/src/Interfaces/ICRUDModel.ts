export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}

export interface ICRUDModelCheck {
  finishMath(id: number): Promise<void>,
}

export interface ICRUDModel<T>
  extends ICRUDModelReader<T>, ICRUDModelCheck {}
