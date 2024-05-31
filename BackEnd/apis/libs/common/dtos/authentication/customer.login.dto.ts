import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CustomerLoginDto {
  @ApiProperty({
    required: true,
    example: faker.internet.userName(),
  })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({
    required: true,
    example: faker.internet.email(),
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    required: true,
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
