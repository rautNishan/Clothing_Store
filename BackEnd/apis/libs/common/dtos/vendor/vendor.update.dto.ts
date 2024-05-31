import { PartialType } from '@nestjs/swagger';
import { VendorCreateDto } from './vendor.create.dto';

export class VendorUpdateDto extends PartialType(VendorCreateDto) {}
