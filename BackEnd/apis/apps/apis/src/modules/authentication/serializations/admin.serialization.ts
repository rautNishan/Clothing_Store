import { ApiProperty } from '@nestjs/swagger';
import { ResponseSerialization } from 'libs/response/serialization/reponse.serialization';

export class AdminSerialization {
  @ApiProperty({
    type: String,
    example: 'asdkajdhjshKJHSdkashdkjhdkjhajsKJHD',
  })
  token: string;
}

export class FinalAdminSerialization extends ResponseSerialization {
  @ApiProperty({
    type: AdminSerialization,
  })
  data: AdminSerialization;
}
