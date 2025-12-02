import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order_product.dto';
import { UpdateOrderProductDto } from './dto/update-order_product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { order_products } from 'src/models';

@Injectable()
export class OrderProductsService {
      constructor(
        @InjectModel(order_products)
          private currentModel: typeof order_products,
        ) {}
  create(createOrderProductDto: CreateOrderProductDto) {
    return 'This action adds a new orderProduct';
  }

  findAll() {
    return `This action returns all orderProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderProduct`;
  }

  update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    return `This action updates a #${id} orderProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderProduct`;
  }
}
