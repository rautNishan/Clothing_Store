import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CustomerFullName {
  @ApiProperty({
    example: faker.internet.userName(),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: faker.internet.userName(),
    required: false,
  })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({
    example: faker.internet.userName(),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
export class CustomerCreateDto {
  @ApiProperty({
    type: CustomerFullName,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  @Type(() => CustomerFullName)
  @ValidateNested({ each: true, message: 'User Name is Required' })
  customerName: CustomerFullName;

  @ApiProperty({
    example: faker.internet.email(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  email: string;

  @ApiProperty({
    example: faker.number.int({ max: 10 }),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(1)
  contact: string;

  @ApiProperty({
    example: faker.internet.userName(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  userName: string;

  @ApiProperty({
    example: faker.lorem.word(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password Minimum Length should be 8' })
  password: string;
}
