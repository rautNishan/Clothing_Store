import { Module } from '@nestjs/common';
import { ProductService } from './product.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ProductService],
})
export class ProductModule {}
