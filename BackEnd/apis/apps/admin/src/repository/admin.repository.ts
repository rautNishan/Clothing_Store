import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'libs/database/repository/base.repository';
import { AdminEntity } from 'libs/entities/admin/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminRepository extends BaseRepository<AdminEntity> {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly _adminRepo: Repository<AdminEntity>,
  ) {
    super(_adminRepo);
  }
}
