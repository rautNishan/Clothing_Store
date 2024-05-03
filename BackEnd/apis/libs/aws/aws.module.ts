import { Module } from '@nestjs/common';
import { AwsS3Service } from './services/aws.s3.service';

@Module({
  providers: [AwsS3Service],
})
export class AwsModule {}
