import { Module } from '@nestjs/common';
import { OrderProductsService } from './order_products.service';
import { OrderProductsController } from './order_products.controller';

@Module({
  controllers: [OrderProductsController],
  providers: [OrderProductsService],
})
export class OrderProductsModule {}
