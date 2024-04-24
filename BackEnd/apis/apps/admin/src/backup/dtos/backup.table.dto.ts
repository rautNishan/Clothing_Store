import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DatabaseNameDto {
  @ApiProperty({
    type: String,
    example: 'TestDataBase',
  })
  @IsString()
  @IsNotEmpty()
  databaseName: string;
}

export class BackUpTablesDto extends DatabaseNameDto {
  @ApiProperty({
    type: [String],
    example: ['table_name'],
  })
  tables: string[];
}
