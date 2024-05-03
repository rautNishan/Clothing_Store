import { ApiProperty } from '@nestjs/swagger';
import { ResponseSerialization } from 'libs/response/serialization/response.serialization';

export class AdminSerialization {
  @ApiProperty({
    type: String,
    example:
      'asdkajdhjshKJHSdkashdkjhdkjhajsKJHDhkajhsdkahdkahdkahjhabsdabkhasdkhakdhaksdkadhkashmbmakbdkadkahdkjahsdkah',
  })
  token: string;
}

export class FinalAdminSerialization extends ResponseSerialization {
  @ApiProperty({
    type: AdminSerialization,
  })
  data: AdminSerialization;
}
