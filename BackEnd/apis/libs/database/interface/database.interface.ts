import { EntityManager, FindOptionsWhere } from 'typeorm';

export interface ICreateOptions<T> {
  entityManger?: EntityManager;
  loadRelations?: boolean;
  listeners?: boolean;
  additionalData?: Partial<T>;
}

export interface IUpdateOptions<T> {
  entityManger?: EntityManager;
  where?: FindOptionsWhere<T>;
  loadRelations?: boolean;
  listeners?: boolean;
  additionalData?: Partial<T>;
}
