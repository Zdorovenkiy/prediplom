import { Module } from '@nestjs/common';
import { ReviewResponsesService } from './review_responses.service';
import { ReviewResponsesController } from './review_responses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { review_responses } from 'src/models';

@Module({
    imports: [SequelizeModule.forFeature([review_responses])],
  controllers: [ReviewResponsesController],
  providers: [ReviewResponsesService],
})
export class ReviewResponsesModule {}
