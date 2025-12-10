import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { order_products, orders, products } from 'src/models';

@Injectable()
export class OrdersService {
      constructor(
        @InjectModel(orders)
        private currentModel: typeof orders,

        @InjectModel(order_products)
        private readonly orderProductModel: typeof order_products, 

        @InjectModel(products)
        private readonly productsModel: typeof products,
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
    return this.currentModel.findAll({
      include: [{
        model: this.orderProductModel,
        as: 'order_products',
      }],
    });
  }

  async findOne(id: number) {
    const order = await this.currentModel.findByPk(id, {
      include: [{
        model: this.orderProductModel,
        as: 'order_products',
        include: [{
          model: this.productsModel,
          as: 'product',
        }],
      }],
    });
    
    if (!order) return null;
    
    return {
      ...order.toJSON(),
      products: order.order_products?.map(op => ({
        id: op.id,
        order_id: op.order_id,
        product_id: op.product_id,
        quantity: op.quantity,
        price: op.price,
        name: (op.product as any)?.title || `Товар ${op.product_id}`,
      })) || [],
    };
  }

  async findByUser(userId: number) {
    const ordersList = await this.currentModel.findAll({
      where: { user_id: userId },
      include: [{
        model: this.orderProductModel,
        as: 'order_products',
        include: [{
          model: this.productsModel,
          as: 'product',
        }],
      }],
      order: [['id', 'DESC']],
    });
    
    return ordersList.map(order => ({
      ...order.toJSON(),
      products: order.order_products?.map(op => ({
        id: op.id,
        order_id: op.order_id,
        product_id: op.product_id,
        quantity: op.quantity,
        price: op.price,
        name: (op.product as any)?.title || `Товар ${op.product_id}`,
      })) || [],
    }));
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.currentModel.update(updateOrderDto, {
      where: { id },
    });
    return await this.findOne(id);
  }
}
