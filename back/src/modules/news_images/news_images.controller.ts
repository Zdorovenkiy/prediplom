import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsImagesService } from './news_images.service';
import { CreateNewsImageDto } from './dto/create-news_image.dto';
import { UpdateNewsImageDto } from './dto/update-news_image.dto';

@Controller('news-images')
export class NewsImagesController {
  constructor(private readonly newsImagesService: NewsImagesService) {}

  @Post()
  async create(@Body() createNewsImageDto: CreateNewsImageDto) {
    return await this.newsImagesService.create(createNewsImageDto);
  }

  @Get()
  async findAll() {
    return await this.newsImagesService.findAll();
  }
}
