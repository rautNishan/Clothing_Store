import { Module } from '@nestjs/common';
import { DebuggerService } from './services/debugger.service';
import { WinstonModule } from 'nest-winston';
import { DebuggerOptionService } from './services/debugger.options.service';
import { DebuggerOptionModule } from './debugger.option.module';

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
