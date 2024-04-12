import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CustomerModule } from './customer.module';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CustomerModule,
    {
      transport: Transport.TCP,
      options: {
        port: parseInt(
          process.env.MICRO_SERVICE_CUSTOMER_SERVICE_PORT || '5001',
        ),
      },
    },
  );
  //Making all serializer property work
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //For example @Exclude() property in entity
  await app.listen();
}
bootstrap();
