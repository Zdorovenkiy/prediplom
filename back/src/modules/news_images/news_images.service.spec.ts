import { Test, TestingModule } from '@nestjs/testing';
import { NewsImagesService } from './news_images.service';

describe('NewsImagesService', () => {
  let service: NewsImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsImagesService],
    }).compile();

    service = module.get<NewsImagesService>(NewsImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
