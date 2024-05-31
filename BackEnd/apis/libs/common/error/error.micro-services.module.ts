import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MicroServiceExceptionFilter } from './error-filter/error.micro-service.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: MicroServiceExceptionFilter,
    },
  ],
})
export class MicroServiceErrorModule {}
