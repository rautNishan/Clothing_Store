import {
  EntityManager,
  FindManyOptions,
  FindOneOptions,
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
  findManyOptions?: FindManyOptions<T>;
  relations?: FindOptionsRelations<T>;
  withDeleted?: boolean;
}

export interface IFindOneOptions<T> {
  entityManage?: EntityManager;
  findOneOptions?: FindOneOptions<T>;
  relations?: FindOptionsRelations<T>;
  withDeleted?: boolean;
  transaction?: boolean;
}

export interface IPaginatedOptions<T> {
  page?: number;
  limit?: number;
  searchBy?: string;
  search?: string;
  sortOrder?: 'ASC' | 'DESC';
  sortBy: string;
  searchableFields?: string[];
  sortableFields?: (keyof T)[];
  entityManger?: EntityManager;
  findManyOptions?: FindManyOptions<T>;
  withDeleted?: boolean;
  relations?: FindOptionsRelations<T>;
}

export interface IPaginationResponse<T> {
  data?: T[];
  limit?: number;
  skip?: number;
  count?: number;
  page?: number;
  totalPages?: number;
}
