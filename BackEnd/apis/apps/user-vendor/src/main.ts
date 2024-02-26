import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserVendorModule } from './user-vendor.module';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserVendorModule,
    {
      transport: Transport.TCP,
      options: {
        port: 5000,
      },
    },
  );
  await app.listen();
}
bootstrap();
