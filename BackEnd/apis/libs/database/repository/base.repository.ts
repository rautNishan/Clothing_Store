import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
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
    if (options.entityManger) {
      return options.entityManger.save(entity);
    } else {
      return this.repository.save(entity);
    }
  }

  async update(data: DeepPartial<T>, options?: IUpdateOptions<T>): Promise<T> {
    if (options.entityManger) {
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
    if (options.entityManger) {
      return options.entityManger.find(this.repository.target, findOptions);
    }
    return this.repository.find(findOptions);
  }

  async findAllWithPagination(
    options?: IPaginatedOptions<T>,
  ): Promise<IPaginationResponse<T>> {
    const page: number = options?.page && options.page > 0 ? options.page : 1; //Make it 1 by Default
    const limit: number =
      options?.limit && options.limit > 0 ? options.limit : 10;
    const skip: number = (page - 1) * limit;
    const findAllWithPaginationOptions = {
      ...options.findManyOptions,
      take: limit, // TypeORM uses `take` for limit
      skip: skip,
    };

    //For search
    if (options?.searchBy && options?.searchFields.length > 0) {
      const searchCondition: any = options.searchFields.map(
        //todo Strict Type implementation
        (field) =>
          ({
            [field]: ILike(`%${options.searchBy}%`),
          }) as FindOptionsWhere<T>,
      );
      findAllWithPaginationOptions.where =
        searchCondition.length > 1
          ? { $or: searchCondition }
          : searchCondition[0];
    }
    if (options?.relations && options.relations) {
      findAllWithPaginationOptions.relations = options.relations;
    }
    if (options?.withDeleted && options.withDeleted) {
      findAllWithPaginationOptions.withDeleted = true;
    }

    //For Sorting
    if (options?.sortableFields) {
      const order: any = {}; //todo strick type implementation
      options.sortableFields.forEach((field) => {
        order[field] = options.sortOrder || 'ASC'; // This line might need adjustment
      });
      findAllWithPaginationOptions.order = order;
    }

    const [data, count] = await this.repository.findAndCount(
      findAllWithPaginationOptions,
    );
    const totalPages: number = Math.ceil(count / limit);

    return { data, limit, skip, count, page, totalPages };
  }

  async findOne(options?: IFindOneOptions<T>): Promise<T | null> {
    const findOneOption = options.findOneOptions ?? {};
    if (options.relations) {
      findOneOption.relations = options.relations;
    }
    if (options.relations) {
      //Return with Relation
    }
    if (options.transaction && options.transaction) {
      findOneOption.transaction = true;
    }
    if (options.entityManage) {
      return options.entityManage.findOne(
        this.repository.target,
        findOneOption,
      );
    }
    return this.repository.findOne(findOneOption);
  }

  async findById(id: number, options: IFindOneOptions<T>): Promise<T | null> {
    const findById: FindOneOptions<T> = options?.findOneOptions ?? {};
    if (options?.transaction && options.transaction) {
      findById.transaction = true;
    }
    if (options?.relations) {
      //Return with Relation
    }
    findById.where = { id: id as any };
    if (options.entityManage) {
      return options.entityManage.findOne(this.repository.target, findById);
    }
    return this.repository.findOne(findById);
  }

  async softDelete(repo: T, options: IUpdateOptions<T>): Promise<T> {
    repo.deletedAt = new Date();
    return await this.update(repo, options);
  }

  async restore(repo: T, options: IUpdateOptions<T>): Promise<T> {
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
