import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_products, orders, products } from 'src/models';

@Module({
    imports: [SequelizeModule.forFeature([orders, order_products, products])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
