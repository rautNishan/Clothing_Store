import { ApiProperty } from '@nestjs/swagger';
import { ResponseSerialization } from 'libs/response/serialization/reponse.serialization';

export class IData {
  id: number;
}
export class CustomerSerializedData {
  @ApiProperty({
    type: Number,
  })
  id: number;
}

export class FinalCustomerSerialization extends ResponseSerialization {
  @ApiProperty({
    type: CustomerSerializedData,
  })
  data: CustomerSerializedData;
}

export class CustomerPaginationSerializedData {}

export class FinalCustomerPaginationSerialization extends ResponseSerialization {}
