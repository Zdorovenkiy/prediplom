import { Injectable } from '@nestjs/common';
import { CreateReviewResponseDto } from './dto/create-review_response.dto';
import { UpdateReviewResponseDto } from './dto/update-review_response.dto';
import { InjectModel } from '@nestjs/sequelize';
import { review_responses } from 'src/models';

@Injectable()
export class ReviewResponsesService {
      constructor(
        @InjectModel(review_responses)
          private currentModel: typeof review_responses,
        ) {}
  create(createReviewResponseDto: CreateReviewResponseDto) {
    return 'This action adds a new reviewResponse';
  }

  findAll() {
    return `This action returns all reviewResponses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewResponse`;
  }

  update(id: number, updateReviewResponseDto: UpdateReviewResponseDto) {
    return `This action updates a #${id} reviewResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewResponse`;
  }
}
