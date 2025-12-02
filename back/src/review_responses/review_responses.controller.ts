import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewResponsesService } from './review_responses.service';
import { CreateReviewResponseDto } from './dto/create-review_response.dto';
import { UpdateReviewResponseDto } from './dto/update-review_response.dto';

@Controller('review-responses')
export class ReviewResponsesController {
  constructor(private readonly reviewResponsesService: ReviewResponsesService) {}

  @Post()
  create(@Body() createReviewResponseDto: CreateReviewResponseDto) {
    return this.reviewResponsesService.create(createReviewResponseDto);
  }

  @Get()
  findAll() {
    return this.reviewResponsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewResponsesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewResponseDto: UpdateReviewResponseDto) {
    return this.reviewResponsesService.update(+id, updateReviewResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewResponsesService.remove(+id);
  }
}
