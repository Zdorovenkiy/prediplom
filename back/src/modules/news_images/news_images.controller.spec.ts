import { Test, TestingModule } from '@nestjs/testing';
import { NewsImagesController } from './news_images.controller';
import { NewsImagesService } from './news_images.service';

describe('NewsImagesController', () => {
  let controller: NewsImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsImagesController],
      providers: [NewsImagesService],
    }).compile();

    controller = module.get<NewsImagesController>(NewsImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
