import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectModel } from '@nestjs/sequelize';
import { feedbacks } from 'src/models';

@Injectable()
export class FeedbackService {
        constructor(
            @InjectModel(feedbacks)
              private currentModel: typeof feedbacks,
        ) {}
        
  async create(createFeedbackDto: CreateFeedbackDto) {
    return await this.currentModel.create(createFeedbackDto);
  }

  async findAll() {
    return await this.currentModel.findAll();
  }
}
