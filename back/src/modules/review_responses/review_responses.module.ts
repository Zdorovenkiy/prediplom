import { Module } from '@nestjs/common';
import { ReviewResponsesService } from './review_responses.service';
import { ReviewResponsesController } from './review_responses.controller';

@Module({
  controllers: [ReviewResponsesController],
  providers: [ReviewResponsesService],
})
export class ReviewResponsesModule {}
