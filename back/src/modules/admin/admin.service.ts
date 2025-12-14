import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { orders, order_products, products, reviews, users, review_responses, product_images } from 'src/models';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { UpdateReviewDto } from '../reviews/dto/update-review.dto';
import { Sequelize, Op } from 'sequelize';
import * as ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(orders)
    private ordersModel: typeof orders,
    @InjectModel(order_products)
    private orderProductsModel: typeof order_products,
    @InjectModel(products)
    private productsModel: typeof products,
    @InjectModel(reviews)
    private reviewsModel: typeof reviews,
    @InjectModel(users)
    private usersModel: typeof users,
    @InjectModel(review_responses)
    private reviewResponsesModel: typeof review_responses,
    @InjectModel(product_images)
    private productImagesModel: typeof product_images,
  ) {}

  async getExport(type: 'products' | 'users' | 'orders') {
    let response: products[] | users[] | orders[] | null = null;

    if (type === 'products') {
        response = await this.productsModel.findAll({ raw: true });
    } else if (type === 'users') {
        response = await this.usersModel.findAll({ raw: true });
    } else {
        response = await this.ordersModel.findAll({ raw: true });
    }

    const worksheetName = 'Товары';

    console.log("response", response);

    if (!response.length || !response) return null;

    const headers = Object.keys(response[0]).map((item) => {
        console.log("item", item);
        return item;
        
    })

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'System';
    workbook.created = new Date();
      
    const worksheet = workbook.addWorksheet(worksheetName);

    worksheet.columns = headers.map(header => ({
      header,
      key: header,
      width: header.length + 10
    }));

    response.forEach((row) => {
        worksheet.addRow(row);
    });
    
    return workbook.xlsx.writeBuffer();
  }

  async getImport(type: 'products' | 'orders', file: Express.Multer.File) {
    if (!file.buffer) {
      throw new BadRequestException('Файл пустой');
    }

    const records = this.parseXlsx(file.buffer);

    if (type === 'products') {
        console.log(records);
        
      await this.productsModel.bulkCreate(records, {
        ignoreDuplicates: true,
        fields: [
            'title',
            'description',
            'price',
            'stock',
            'description_short',
            'is_discount'
        ]
      });
    }

    if (type === 'orders') {
        console.log(records);
      await this.ordersModel.bulkCreate(records, {
        ignoreDuplicates: true,
        fields: [
            'user_id',
            'total',
            'is_payed'
        ]
      });
    }
  }

parseXlsx(buffer: Buffer): any[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  return XLSX.utils.sheet_to_json(sheet);
}

  // Dashboard
  async getDashboardStats() {
    const totalOrders = await this.ordersModel.count();
    const totalUsers = await this.usersModel.count();
    const totalProducts = await this.productsModel.count();
    
    const totalRevenueResult = await this.ordersModel.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
      ],
      raw: true,
    });
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    // Поскольку timestamps: false, считаем все заказы как недавние для примера
    const recentOrders = totalOrders;

    // Считаем отзывы без ответов
    const allReviews = await this.reviewsModel.findAll();
    const allResponses = await this.reviewResponsesModel.findAll();
    const reviewsWithResponses = new Set(allResponses.map(r => r.review_id));
    const pendingReviews = allReviews.filter(review => !reviewsWithResponses.has(review.id!)).length;

    return {
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue: Number(totalRevenue),
      recentOrders,
      pendingReviews,
    };
  }

  // Products
  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productsModel.create(createProductDto);
    return await this.productsModel.findByPk(product.id, {
      include: [{
        model: this.productImagesModel,
        as: 'images',
      }],
    });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    await this.productsModel.update(updateProductDto, {
      where: { id },
    });
    return await this.productsModel.findByPk(id, {
      include: [{
        model: this.productImagesModel,
        as: 'images',
      }],
    });
  }

  async deleteProduct(id: number) {
    try {
      // Проверяем, используется ли продукт в заказах
      const orderProducts = await this.orderProductsModel.count({
        where: { product_id: id },
      });

      if (orderProducts > 0) {
        throw new Error(`Невозможно удалить товар: он используется в ${orderProducts} заказах`);
      }

      // Удаляем связанные изображения
      const productImages = await this.productImagesModel.findAll({
        where: { product_id: id },
      });
      
      if (productImages.length > 0) {
        await this.productImagesModel.destroy({
          where: { product_id: id },
        });
      }

      // Удаляем связанные отзывы
      const reviews = await this.reviewsModel.findAll({
        where: { product_id: id },
      });
      
      if (reviews.length > 0) {
        await this.reviewsModel.destroy({
          where: { product_id: id },
        });
      }

      // Удаляем сам продукт
      return await this.productsModel.destroy({
        where: { id },
      });
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error('Ошибка при удалении товара: товар используется в заказах или имеет связанные данные');
    }
  }

  // Orders
  async getAllOrders() {
    const ordersList = await this.ordersModel.findAll({
      include: [{
        model: this.orderProductsModel,
        as: 'order_products',
        include: [{
          model: this.productsModel,
          as: 'product',
        }],
      }],
      order: [['id', 'DESC']],
    });
    
    // Преобразуем формат для фронтенда
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

  async getOrder(id: number) {
    const order = await this.ordersModel.findByPk(id, {
      include: [{
        model: this.orderProductsModel,
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

  async getOrdersByUser(userId: number) {
    const ordersList = await this.ordersModel.findAll({
      where: { user_id: userId },
      include: [{
        model: this.orderProductsModel,
        as: 'order_products',
        include: [{
          model: this.productsModel,
          as: 'product',
        }],
      }],
      order: [['id', 'DESC']],
    });
    
    // Преобразуем формат для фронтенда
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

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    await this.ordersModel.update(updateOrderDto, {
      where: { id },
    });
    return await this.getOrder(id);
  }

  // Reviews
  async getAllReviews() {
    return await this.reviewsModel.findAll({
      include: [{
        model: this.usersModel,
        as: 'user',
      }],
      order: [['id', 'DESC']],
    });
  }

  async getReviewsByUser(userId: number) {
    return await this.reviewsModel.findAll({
      where: { user_id: userId },
      include: [{
        model: this.usersModel,
        as: 'user',
      }],
      order: [['id', 'DESC']],
    });
  }

  async updateReview(id: number, updateReviewDto: UpdateReviewDto) {
    await this.reviewsModel.update(updateReviewDto, {
      where: { id },
    });
    return await this.reviewsModel.findByPk(id, {
      include: [{
        model: this.usersModel,
        as: 'user',
      }],
    });
  }

  async deleteReview(id: number) {
    return await this.reviewsModel.destroy({
      where: { id },
    });
  }

  async generateAIResponse(reviewText: string): Promise<{ response: string }> {
    // Заглушка для генерации ответа ИИ
    // В реальном проекте здесь будет интеграция с AI API (например, OpenAI)
    const responses = [
      'Спасибо за ваш отзыв! Мы рады, что вам понравился наш товар.',
      'Благодарим за обратную связь. Ваше мнение очень важно для нас.',
      'Спасибо за отзыв! Мы постоянно работаем над улучшением качества наших товаров.',
      'Благодарим за вашу оценку. Мы ценим каждого клиента!',
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      response: randomResponse + ' ' + reviewText.substring(0, 50) + '...',
    };
  }

  async sendReviewResponse(reviewId: number, text: string) {
    return await this.reviewResponsesModel.create({
      review_id: reviewId,
      text: text,
      user_id: 1, // Администратор
    });
  }

  // Users
  async getAllUsers() {
    return await this.usersModel.findAll({
      attributes: { exclude: ['password'] },
      order: [['id', 'DESC']],
    });
  }

  async updateUserRole(userId: number, roleId: number) {
    await this.usersModel.update(
      { role_id: roleId },
      { where: { id: userId } }
    );
    return await this.usersModel.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
  }

  async deleteUser(id: number) {
    return await this.usersModel.destroy({
      where: { id },
    });
  }
}

