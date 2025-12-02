import { Module } from '@nestjs/common';
import { NewsImagesService } from './news_images.service';
import { NewsImagesController } from './news_images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { news_images } from 'src/models';

@Module({
  imports: [SequelizeModule.forFeature([news_images])],
  controllers: [NewsImagesController],
  providers: [NewsImagesService],
})
export class NewsImagesModule {}
