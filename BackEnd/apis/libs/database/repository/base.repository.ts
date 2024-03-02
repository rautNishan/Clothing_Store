import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { DbBaseEntity } from '../entity/base.entity';
import {
  ICreateOptions,
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
}
