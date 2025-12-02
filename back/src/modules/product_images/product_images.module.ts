import { Module } from '@nestjs/common';
import { ProductImagesService } from './product_images.service';
import { ProductImagesController } from './product_images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { product_images } from 'src/models';

@Module({
    imports: [SequelizeModule.forFeature([product_images])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
