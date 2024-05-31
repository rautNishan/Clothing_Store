import { Injectable } from '@nestjs/common';
import { ICreateOptions } from 'libs/common/database/interface/database.interface';
import { VendorEntity } from 'libs/common/entities/vendor/vendor.entity';
import { VendorCreateDto } from '../../../../../../libs/common/dtos/vendor/vendor.create.dto';
import { VendorRepository } from '../repository/vendor.repository';

@Injectable()
export class VendorService {
  constructor(private readonly _vendorRepo: VendorRepository) {}

  async create(
    incomingData: VendorCreateDto,
    options?: ICreateOptions<VendorEntity>,
  ) {
    console.log('This is Incoming Data: ', incomingData);
    console.log('This is Options: ', options);
  }
}
