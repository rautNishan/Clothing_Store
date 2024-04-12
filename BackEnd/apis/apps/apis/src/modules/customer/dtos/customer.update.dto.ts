import { PartialType } from '@nestjs/swagger';
import { CustomerCreateDto } from './customer.create.dto';

export class CustomerUpdateDto extends PartialType(CustomerCreateDto) {}
