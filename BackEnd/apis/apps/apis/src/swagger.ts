import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminRouterModule } from './router/admin-router/admin.router.module';
import { CustomerRouterModule } from './router/customer-router/customer.router.module';

export function swaggerSetup(app: INestApplication): void {
  const admin = new DocumentBuilder()
    .setTitle('Admin APIs')
    .setDescription('Here are the APIs for the admin.')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .build();
  const adminDocumentation = SwaggerModule.createDocument(app, admin, {
    include: [AdminRouterModule],
  });
  SwaggerModule.setup('admin-docs', app, adminDocumentation);

  const customer = new DocumentBuilder()
    .setTitle('Customer APIs')
    .setDescription('Here are the APIs for the customer.')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .build();
  const customerDocumentation = SwaggerModule.createDocument(app, customer, {
    include: [CustomerRouterModule],
  });
  SwaggerModule.setup('customer-docs', app, customerDocumentation);
}
