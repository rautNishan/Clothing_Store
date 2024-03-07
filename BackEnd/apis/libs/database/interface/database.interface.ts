import {
  EntityManager,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
} from 'typeorm';

export interface ICreateOptions<T> {
  entityManger?: EntityManager;
  loadRelations?: boolean;
  listeners?: boolean;
  additionalData?: Partial<T>;
  relations?: FindOptionsRelations<T>;
}

export interface IUpdateOptions<T> {
  entityManger?: EntityManager;
  where?: FindOptionsWhere<T>;
  loadRelations?: boolean;
  listeners?: boolean;
  additionalData?: Partial<T>;
  relations?: FindOptionsRelations<T>;
}

export interface IFindManyOptions<T> {
  entityManger?: EntityManager;
  where?: FindOptionsWhere<T>;
  findManyOptions?: FindManyOptions<T>;
  relations?: FindOptionsRelations<T>;
}
