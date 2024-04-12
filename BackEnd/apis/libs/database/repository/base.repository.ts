import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOneOptions, ILike, Repository } from 'typeorm';
import { DbBaseEntity } from '../entity/base.entity';
import {
  ICreateOptions,
  IFindManyOptions,
  IFindOneOptions,
  IPaginatedOptions,
  IPaginationResponse,
  IUpdateOptions,
} from '../interface/database.interface';
import { SORT_BY_ENUM } from 'libs/docs/constants/doc.enum.constant';
import { PAGINATION } from '../constants/pagination.enum';

@Injectable()
export abstract class BaseRepository<T extends DbBaseEntity> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(data: DeepPartial<T>, options?: ICreateOptions<T>): Promise<T> {
    try {
      const entity = this.repository.create(data);
      if (options?.entityManger) {
        return options.entityManger.save(entity);
      } else {
        return this.repository.save(entity);
      }
    } catch (error) {
      throw error;
    }
  }

  async update(data: DeepPartial<T>, options?: IUpdateOptions<T>): Promise<T> {
    try {
      data.updatedAt = new Date();
      if (options?.entityManger) {
        return options.entityManger.save<T>(data as T);
      } else {
        return this.repository.save(data as T);
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll(options?: IFindManyOptions<T>): Promise<T[] | []> {
    try {
      const findOptions = options?.findManyOptions || {};
      if (options?.relations) {
        findOptions.relations = options.relations;
      }
      if (options?.withDeleted && options.withDeleted) {
        findOptions.withDeleted = true;
      }
      if (options?.relations) {
        //Return with Relation
      }
      if (options?.entityManger) {
        return options.entityManger.find(this.repository.target, findOptions);
      }
      return this.repository.find(findOptions);
    } catch (error) {
      throw error;
    }
  }

  async findAllWithPagination(
    options?: IPaginatedOptions<T>,
  ): Promise<IPaginationResponse<T>> {
    try {
      const page: number =
        options?.page && options.page > 0
          ? options.page
          : PAGINATION.DEFAULT_PAGE_NUMBER;
      const limit: number =
        options?.limit && options.limit > 0
          ? options.limit
          : PAGINATION.DEFAULT_LIMIT;
      const skip: number = (page - 1) * limit;
      const findAllWithPaginationOptions = {
        ...options?.findManyOptions,
        take: limit, // TypeORM uses `take` for limit
        skip: skip,
      };

      //For search
      if (
        options?.searchBy &&
        options?.searchableFields &&
        options?.search &&
        options?.searchableFields.length > 0
      ) {
        const columns: string[] = options.searchBy.split(',');

        const searchCondition: any = columns
          ?.filter((s) => options.searchableFields?.includes(s))
          .map((s) => ({ [s]: ILike(`%${options.search}`) }));

        findAllWithPaginationOptions.where =
          searchCondition.length > 1
            ? { $or: searchCondition }
            : searchCondition[0];
      }

      if (options?.relations && options.relations) {
        findAllWithPaginationOptions.relations = options.relations;
      }
      // if (options?.withDeleted && options.withDeleted) {
      //   findAllWithPaginationOptions.withDeleted = true;
      // }
      findAllWithPaginationOptions.withDeleted = options?.withDeleted;

      //For Sorting
      if (options?.sortableFields) {
        const order: any = {}; //todo strick type implementation
        options.sortableFields.forEach((field) => {
          order[field] = options.sortOrder || SORT_BY_ENUM.ASC;
        });
        findAllWithPaginationOptions.order = order;
      }

      const [data, count] = await this.repository.findAndCount(
        findAllWithPaginationOptions,
      );

      const totalPages: number = Math.ceil(count / limit);

      return { data, limit, skip, count, page, totalPages };
    } catch (error) {
      throw error;
    }
  }

  async findOne(options?: IFindOneOptions<T>): Promise<T | null> {
    try {
      const findOneOption = options?.findOneOptions ?? {};
      if (options?.relations) {
        findOneOption.relations = options.relations;
      }
      if (options?.relations) {
        //Return with Relation
      }
      if (options?.transaction && options.transaction) {
        findOneOption.transaction = true;
      }
      if (options?.entityManage) {
        return options.entityManage.findOne(
          this.repository.target,
          findOneOption,
        );
      }
      return this.repository.findOne(findOneOption);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number, options?: IFindOneOptions<T>): Promise<T | null> {
    try {
      const findById: FindOneOptions<T> = options?.findOneOptions ?? {};
      if (options?.transaction && options.transaction) {
        findById.transaction = true;
      }
      if (options?.relations) {
        //Return with Relation
      }
      findById.where = { id: id as any };
      if (options?.entityManage) {
        return options.entityManage.findOne(this.repository.target, findById);
      }
      return this.repository.findOne(findById);
    } catch (error) {
      throw error;
    }
  }

  async softDelete(repo: T, options?: IUpdateOptions<T>): Promise<T> {
    try {
      repo.deletedAt = new Date();
      return await this.update(repo, options);
    } catch (error) {
      throw error;
    }
  }

  async restore(repo: T, options?: IUpdateOptions<T>): Promise<T> {
    try {
      repo.deletedAt = null;
      return await this.update(repo, options);
    } catch (error) {
      throw error;
    }
  }

  async delete(repo: T, options: IUpdateOptions<T>): Promise<T> {
    try {
      if (options?.entityManger) {
        return options.entityManger.remove(this.repository.target, repo);
      }
      return this.repository.remove(repo);
    } catch (error) {
      throw error;
    }
  }
}
