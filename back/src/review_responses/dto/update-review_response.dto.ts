import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewResponseDto } from './create-review_response.dto';

export class UpdateReviewResponseDto extends PartialType(CreateReviewResponseDto) {}
