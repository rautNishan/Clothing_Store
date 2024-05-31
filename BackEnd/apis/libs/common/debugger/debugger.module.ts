import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { DebuggerOptionModule } from './debugger.option.module';
import { DebuggerOptionService } from './services/debugger.options.service';
import { DebuggerService } from './services/debugger.service';

@Module({
  providers: [DebuggerService],
  exports: [DebuggerService],
  imports: [
    WinstonModule.forRootAsync({
      inject: [DebuggerOptionService],
      imports: [DebuggerOptionModule],
      useFactory: (debuggerOptionService: DebuggerOptionService) =>
        debuggerOptionService.createLogger(),
    }),
  ],
})
export class DebuggerModule {}
