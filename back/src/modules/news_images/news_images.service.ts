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

  create(createNewsImageDto: CreateNewsImageDto) {
    return 'This action adds a new newsImage';
  }

  findAll() {
    return `This action returns all newsImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} newsImage`;
  }

  update(id: number, updateNewsImageDto: UpdateNewsImageDto) {
    return `This action updates a #${id} newsImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} newsImage`;
  }
}
