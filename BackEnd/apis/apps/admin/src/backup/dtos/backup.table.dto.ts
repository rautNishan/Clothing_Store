import { ApiProperty } from '@nestjs/swagger';

export class BackUpTablesDto {
  @ApiProperty({
    type: [String],
    example: ['table_name'],
  })
  tables: string[];
}
