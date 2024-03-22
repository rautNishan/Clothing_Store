import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DebuggerModule } from './debugger.module';
import { DebuggerInterceptor } from './interceptors/debugger.logger.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DebuggerInterceptor,
    },
  ],
  imports: [DebuggerModule],
})
export class DebuggerLoggerModule {}
