import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({
    required: true,
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    required: true,
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
