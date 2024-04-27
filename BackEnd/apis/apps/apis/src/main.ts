import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  swaggerSetup(app);
  await app.listen(3000);
}
bootstrap();
