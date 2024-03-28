import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { SORT_BY_ENUM } from '../constants/doc.enum.constant';

export class PaginationQueryDto {
  @ApiProperty({
    required: false,
    type: Number,
  })
  limit?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  page?: number;

  @ApiProperty({
    required: false,
    type: SORT_BY_ENUM,
    example: SORT_BY_ENUM.ASC,
  })
  sortOrder?: SORT_BY_ENUM;

  @ApiProperty({
    required: false,
    type: String,
  })
  sortBy?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  searchBy?: string;

  @ApiProperty({
    required: false,
    type: String,
    example: faker.internet.userName(),
  })
  search?: string;

  @ApiProperty({
    required: false,
    type: Boolean,
    example: false,
  })
  withDeleted?: boolean;
}
