import { Module } from '@nestjs/common';
import { OrderProductsService } from './order_products.service';
import { OrderProductsController } from './order_products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_products } from 'src/models';

@Module({
    imports: [SequelizeModule.forFeature([order_products])],
  controllers: [OrderProductsController],
  providers: [OrderProductsService],
})
export class OrderProductsModule {}
