import { Injectable } from '@nestjs/common';
import { CreateReviewResponseDto } from './dto/create-review_response.dto';
import { UpdateReviewResponseDto } from './dto/update-review_response.dto';

@Injectable()
export class ReviewResponsesService {
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
