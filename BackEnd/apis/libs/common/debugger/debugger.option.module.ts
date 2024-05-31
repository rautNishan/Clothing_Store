import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import debuggerConfig from 'libs/common/config/debugger.config';
import { DebuggerOptionService } from './services/debugger.options.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [debuggerConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        DEBUGGER_WRITE_INTO_FILE: Joi.string().required(),
        DEBUGGER_MAX_FILE: Joi.string().required(),
        DEBUGGER_MAX_SIZE: Joi.string().required(),
      }),
    }),
  ],
  providers: [DebuggerOptionService],
  exports: [DebuggerOptionService],
})
export class DebuggerOptionModule {}
