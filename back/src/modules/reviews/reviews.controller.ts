import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewsService.create(createReviewDto);
  }

  @Get()
  async findAll() {
    return await this.reviewsService.findAll();
  }

  @Get('product')
  async findAllByProduct(@Query('id') id: number, @Query('limit') limit?: number) {
    return await this.reviewsService.findAllByProduct(id, limit);
  }
}
