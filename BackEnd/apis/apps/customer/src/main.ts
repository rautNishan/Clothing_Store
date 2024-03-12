import { NestFactory } from '@nestjs/core';
import { CustomerModule } from './customer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CustomerModule,
    {
      transport: Transport.TCP,
      options: {
        port: parseInt(process.env.MICRO_SERVICE_CUSTOMER_SERVICE_PORT) || 5001,
      },
    },
  );
  await app.listen();
}
bootstrap();
