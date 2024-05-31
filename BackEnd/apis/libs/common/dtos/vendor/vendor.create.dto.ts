import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  IVendor,
  IVendorFullName,
} from 'libs/common/interfaces/vendor/vendor.interface';

export class VendorFullNameDto implements IVendorFullName {
  @ApiProperty({
    example: faker.person.firstName(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: faker.person.middleName(),
    required: false,
  })
  @IsString()
  @IsOptional()
  middleName?: string | null;

  @ApiProperty({
    example: faker.person.lastName(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class VendorCreateDto implements IVendor {
  @ApiProperty({
    example: VendorFullNameDto,
    required: true,
  })
  @Type(() => VendorFullNameDto)
  @ValidateNested({ each: true })
  vendorName: VendorFullNameDto;

  @ApiProperty({
    example: faker.internet.email(),
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '9809089098',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contact: string;

  @ApiProperty({
    example: faker.internet.userName(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: faker.internet.password(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
