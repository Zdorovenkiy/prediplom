import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { order_products, orders } from 'src/models';

@Injectable()
export class OrdersService {
      constructor(
        @InjectModel(orders)
        private currentModel: typeof orders,

        @InjectModel(order_products)
        private readonly orderProductModel: typeof order_products, 
        ) {}

  async create(createOrderDto: CreateOrderDto) {
    const {products, ...orders} = createOrderDto;


    
    const orderData = await this.currentModel.create(orders, {raw: true});
    
    const productsData = products.map((item) => {
        return {...item, order_id: orderData.id!};
    })
    
    await this.orderProductModel.bulkCreate(productsData);
    
    return {message : 'success'};
  }


  findAll() {
    return this.currentModel.findAll();
  }
}
