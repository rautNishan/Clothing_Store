import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'libs/database/repository/base.repository';
import { VendorEntity } from 'libs/entities/vendor/vendor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendorRepository extends BaseRepository<VendorEntity> {
  constructor(
    @InjectRepository(VendorEntity)
    private vendorEntity: Repository<VendorEntity>,
  ) {
    super(vendorEntity);
  }
}
