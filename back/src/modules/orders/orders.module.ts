import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { orders } from 'src/models';

@Module({
    imports: [SequelizeModule.forFeature([orders])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
