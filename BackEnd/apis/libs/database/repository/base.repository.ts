import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { DbBaseEntity } from '../entity/base.entity';
import {
  ICreateOptions,
  IFindManyOptions,
  IFindOneOptions,
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

  async findAll(options?: IFindManyOptions<T>): Promise<T[]> {
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
}
