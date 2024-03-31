import { ApiProperty } from '@nestjs/swagger';
import { ResponseSerialization } from 'libs/response/serialization/reponse.serialization';

export class CustomerSerialization {
  @ApiProperty({
    type: String,
    example: 'asdkajdhjshKJHSdkashdkjhdkjhajsKJHD',
  })
  token: string;
}

export class FinalCustomerSerialization extends ResponseSerialization {
  @ApiProperty({
    type: CustomerSerialization,
  })
  data: CustomerSerialization;
}
