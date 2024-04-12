import { ApiProperty } from '@nestjs/swagger';
import { ResponseSerialization } from 'libs/response/serialization/response.serialization';

export class AdminDataBaseBackUpSerialization extends ResponseSerialization {
  @ApiProperty({
    type: String,
    example: 'DataBase BackUp Created Successfully',
  })
  data: string;
}

export class AdminDataBaseTableBackUpSerialization extends ResponseSerialization {
  @ApiProperty({
    type: String,
    example: 'DataBase Tables BackUp Created Successfully',
  })
  data: string;
}
