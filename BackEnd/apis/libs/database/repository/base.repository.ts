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

@Injectable()
export abstract class BaseRepository<T extends DbBaseEntity> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(data: DeepPartial<T>, options?: ICreateOptions<T>): Promise<T> {
    const entity = this.repository.create(data);
    if (options?.entityManger) {
      return options.entityManger.save(entity);
    } else {
      return this.repository.save(entity);
    }
  }

  async update(data: DeepPartial<T>, options?: IUpdateOptions<T>): Promise<T> {
    if (options?.entityManger) {
      return options.entityManger.save<T>(data as T);
    } else {
      return this.repository.save(data as T);
    }
  }

  async findAll(options?: IFindManyOptions<T>): Promise<T[] | []> {
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
  }

  async findAllWithPagination(
    options?: IPaginatedOptions<T>,
  ): Promise<IPaginationResponse<T>> {
    try {
      const page: number = options?.page && options.page > 0 ? options.page : 1; //Make it 1 by Default
      const limit: number =
        options?.limit && options.limit > 0 ? options.limit : 10;
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

        for (let i = 0; i < searchCondition.length; i++) {
          console.log('This is SearchCondition: ', searchCondition[i]);
        }

        findAllWithPaginationOptions.where =
          searchCondition.length > 1
            ? { $or: searchCondition }
            : searchCondition[0];
      }
      console.log('Search Completed');

      if (options?.relations && options.relations) {
        findAllWithPaginationOptions.relations = options.relations;
      }
      // if (options?.withDeleted && options.withDeleted) {
      //   findAllWithPaginationOptions.withDeleted = true;
      // }
      findAllWithPaginationOptions.withDeleted = options?.withDeleted;

      console.log('Relation adn WithDeleted Completed');

      //For Sorting
      if (options?.sortableFields) {
        const order: any = {}; //todo strick type implementation
        options.sortableFields.forEach((field) => {
          order[field] = options.sortOrder || 'ASC'; // This line might need adjustment
        });
        findAllWithPaginationOptions.order = order;
      }
      console.log('Sort Completed');
      console.log(
        'Find With Pagination Options: ',
        findAllWithPaginationOptions,
      );

      const [data, count] = await this.repository.findAndCount(
        findAllWithPaginationOptions,
      );
      console.log('Data and count completed');

      console.log('Total Page');
      const totalPages: number = Math.ceil(count / limit);
      console.log('Returning Data');

      return { data, limit, skip, count, page, totalPages };
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }

  async findOne(options?: IFindOneOptions<T>): Promise<T | null> {
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
  }

  async findById(id: number, options?: IFindOneOptions<T>): Promise<T | null> {
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
  }

  async softDelete(repo: T, options?: IUpdateOptions<T>): Promise<T> {
    repo.deletedAt = new Date();
    return await this.update(repo, options);
  }

  async restore(repo: T, options?: IUpdateOptions<T>): Promise<T> {
    repo.deletedAt = null;
    return await this.update(repo, options);
  }

  async delete(repo: T, options: IUpdateOptions<T>): Promise<T> {
    if (options?.entityManger) {
      return options.entityManger.remove(this.repository.target, repo);
    }
    return this.repository.remove(repo);
  }
}
