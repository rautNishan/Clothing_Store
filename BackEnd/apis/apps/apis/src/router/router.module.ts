import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { AdminRouterModule } from './admin-router/admin.router.module';
@Module({})
export class AppRouterModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference<any>
    )[] = [];

    // if (process.env.HTTP_ENABLE === 'true') {
    imports.push(
      AdminRouterModule,
      NestJsRouterModule.register([
        {
          path: '/admin',
          module: AdminRouterModule,
        },
      ]),
    );
    // }

    return {
      module: AppRouterModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
}
