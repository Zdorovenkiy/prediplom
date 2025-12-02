import { Test, TestingModule } from '@nestjs/testing';
import { ReviewResponsesController } from './review_responses.controller';
import { ReviewResponsesService } from './review_responses.service';

describe('ReviewResponsesController', () => {
  let controller: ReviewResponsesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewResponsesController],
      providers: [ReviewResponsesService],
    }).compile();

    controller = module.get<ReviewResponsesController>(ReviewResponsesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
