import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsImagesService } from './news_images.service';
import { CreateNewsImageDto } from './dto/create-news_image.dto';
import { UpdateNewsImageDto } from './dto/update-news_image.dto';

@Controller('news-images')
export class NewsImagesController {
  constructor(private readonly newsImagesService: NewsImagesService) {}

  @Post()
  create(@Body() createNewsImageDto: CreateNewsImageDto) {
    return this.newsImagesService.create(createNewsImageDto);
  }

  @Get()
  findAll() {
    return this.newsImagesService.findAll();
  }
}
