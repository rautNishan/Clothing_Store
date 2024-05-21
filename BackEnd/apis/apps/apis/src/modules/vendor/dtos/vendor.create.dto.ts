import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class VendorFullNameDto {
  @ApiProperty({
    example: faker.person.firstName(),
    required: false,
    type: String,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: faker.person.middleName(),
    required: false,
    type: String,
  })
  @IsOptional()
  middleName?: string;

  @ApiProperty({
    example: faker.person.lastName(),
    required: true,
    type: String,
  })
  @IsNotEmpty()
  lastName: string;
}

export class VendorCreateDto {
  @ApiProperty({
    required: true,
    type: VendorFullNameDto,
  })
  @IsNotEmpty()
  @Type(() => VendorFullNameDto)
  @ValidateNested({ each: true })
  vendorName: VendorFullNameDto;

  @ApiProperty({
    example: faker.internet.email(),
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '9090909090',
    required: true,
  })
  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  contact: string;

  @ApiProperty({
    example: faker.person.firstName(),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    example: faker.internet.password(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
