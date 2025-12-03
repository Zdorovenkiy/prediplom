import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { reviews } from 'src/models';

@Injectable()
export class ReviewsService {
      constructor(
        @InjectModel(reviews)
          private currentModel: typeof reviews,
        ) {}

    async create(createReviewDto: CreateReviewDto) {
        return await this.currentModel.create(createReviewDto);
    }

    async findAll() {
        return await this.currentModel.findAll();
    }
}
