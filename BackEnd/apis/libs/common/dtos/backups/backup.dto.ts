import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DatabaseName {
  @ApiProperty({
    type: String,
    example: 'TestDataBase',
  })
  @IsString()
  @IsNotEmpty()
  databaseName: string;
}

export class BackUpTablesDto extends DatabaseName {
  @ApiProperty({
    type: [String],
    example: ['table_name'],
  })
  tables: string[];
}
