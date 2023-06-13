// import { ID, NewEntity } from './index';

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  // findById(id: ID): Promise<T | null>,
}

// export interface ICRUDModelCreator<T> {
//   create(data: NewEntity<T>): Promise<T>,
// }

// export interface ICRUDModelUpdater<T> {
//   update(id: ID, data: Partial<T>): Promise<T | null>,
// }

// export interface ICRUDModelDeleter {
//   delete(id: ID): Promise<number>,
// }

export type ICRUDModel<T> = ICRUDModelReader<T>;
