import { ApiProperty } from '@nestjs/swagger';
import {
  ResponsePaginationSerialization,
  ResponseSerialization,
} from 'libs/common/response/serialization/response.serialization';

export class CustomerFullName {
  @ApiProperty({
    type: String,
  })
  firstName: string;

  @ApiProperty({
    type: String,
  })
  middleName?: string;

  @ApiProperty({
    type: String,
  })
  lastName: string;
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

export class CustomerPaginationSerializedData {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: CustomerFullName,
  })
  customerName: CustomerFullName;
}

export class FinalCustomerPaginationSerialization extends ResponsePaginationSerialization {
  @ApiProperty({
    type: [CustomerPaginationSerializedData],
  })
  data: CustomerPaginationSerializedData;
}
