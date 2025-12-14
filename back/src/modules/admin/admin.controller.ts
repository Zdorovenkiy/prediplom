import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, Header, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { UpdateReviewDto } from '../reviews/dto/update-review.dto';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('export/:type')
  async getExport(@Param('type') type: 'products' | 'users' | 'orders', @Res() res: Response) {
    const buffer = await this.adminService.getExport(type);

    if (!buffer) throw new HttpException('Данных нет', HttpStatus.BAD_REQUEST); 

    res.setHeader('Content-Type', 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
        'Content-Disposition',
        `attachment; filename=${type}.xlsx`
    );

    res.send(buffer);
}

  @Post('import/:type')
  @UseInterceptors(FileInterceptor('file'))
  async getImport(
    @Param('type') type: 'products' | 'orders', 
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log("type", type);
    console.log(file);
    
    await this.adminService.getImport(type, file);

    return {message: 'Success'}
  }

  // Dashboard
  @Get('dashboard')
  async getDashboardStats() {
    return await this.adminService.getDashboardStats();
  }

  // Products
  @Post('products')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.adminService.createProduct(createProductDto);
  }

  @Patch('products/:id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.adminService.updateProduct(+id, updateProductDto);
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.adminService.deleteProduct(+id);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Ошибка при удалении товара',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Orders
  @Get('orders')
  async getAllOrders() {
    return await this.adminService.getAllOrders();
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    return await this.adminService.getOrder(+id);
  }

  @Get('orders/user/:userId')
  async getOrdersByUser(@Param('userId') userId: string) {
    return await this.adminService.getOrdersByUser(+userId);
  }

  @Patch('orders/:id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.adminService.updateOrder(+id, updateOrderDto);
  }

  // Reviews
  @Get('reviews')
  async getAllReviews() {
    return await this.adminService.getAllReviews();
  }

  @Get('reviews/user/:userId')
  async getReviewsByUser(@Param('userId') userId: string) {
    return await this.adminService.getReviewsByUser(+userId);
  }

  @Patch('reviews/:id')
  async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.adminService.updateReview(+id, updateReviewDto);
  }

  @Delete('reviews/:id')
  async deleteReview(@Param('id') id: string) {
    return await this.adminService.deleteReview(+id);
  }

  @Post('reviews/generate-response')
  async generateAIResponse(@Body() body: { reviewId: number; reviewText: string }) {
    return await this.adminService.generateAIResponse(body.reviewText);
  }

  @Post('reviews/:reviewId/response')
  async sendReviewResponse(
    @Param('reviewId') reviewId: string,
    @Body() body: { text: string }
  ) {
    return await this.adminService.sendReviewResponse(+reviewId, body.text);
  }

  // Users
  @Get('users')
  async getAllUsers() {
    return await this.adminService.getAllUsers();
  }

  @Patch('users/:userId/role')
  async updateUserRole(
    @Param('userId') userId: string,
    @Body() body: { role_id: number }
  ) {
    return await this.adminService.updateUserRole(+userId, body.role_id);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.adminService.deleteUser(+id);
  }
}

