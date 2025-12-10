import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { orders, order_products, products, reviews, users, review_responses, product_images } from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      orders,
      order_products,
      products,
      reviews,
      users,
      review_responses,
      product_images,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

