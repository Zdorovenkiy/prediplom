import { Injectable } from '@nestjs/common';
import { CreateNewsImageDto } from './dto/create-news_image.dto';
import { UpdateNewsImageDto } from './dto/update-news_image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { news_images } from 'src/models';

@Injectable()
export class NewsImagesService {
        constructor(
            @InjectModel(news_images)
              private currentModel: typeof news_images,
        ) {}

  async create(createNewsImageDto: CreateNewsImageDto) {
    return await this.currentModel.create(createNewsImageDto);
  }

  async findAll() {
    return await this.currentModel.findAll();
  }
}
