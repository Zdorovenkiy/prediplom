import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductsController } from './order_products.controller';
import { OrderProductsService } from './order_products.service';

describe('OrderProductsController', () => {
  let controller: OrderProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderProductsController],
      providers: [OrderProductsService],
    }).compile();

    controller = module.get<OrderProductsController>(OrderProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
