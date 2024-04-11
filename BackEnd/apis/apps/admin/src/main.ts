import { NestFactory, Reflector } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AdminModule,
    {
      transport: Transport.TCP,
      options: {
        port: parseInt(process.env.MICRO_SERVICE_ADMIN_SERVICE_PORT || '5000'),
      },
    },
  );
  //Making all serializer property work
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //For example @Exclude() property in entity
  await app.listen();
}

bootstrap();
