import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { reviews, users } from 'src/models';

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
        return await this.currentModel.findAll({
            include: [
                {
                    model: users,
                    as: 'user',
                }
            ]
        });
    }

    async findAllByProduct(id: number, limit: number = 0 ) {
        let option: any = {
            where: {
                product_id: id
            },
            include: [
                {
                    model: users,
                    as: 'user',
                }
            ]
        }
        if (limit) {
            option = {
                ...option,
                limit: Number(limit)
            }
        }
        return await this.currentModel.findAll(option);
    }
}
