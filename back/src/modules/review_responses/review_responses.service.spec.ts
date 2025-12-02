import { Test, TestingModule } from '@nestjs/testing';
import { ReviewResponsesService } from './review_responses.service';

describe('ReviewResponsesService', () => {
  let service: ReviewResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewResponsesService],
    }).compile();

    service = module.get<ReviewResponsesService>(ReviewResponsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
