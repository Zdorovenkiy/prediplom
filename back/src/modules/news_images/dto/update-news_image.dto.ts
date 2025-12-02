import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsImageDto } from './create-news_image.dto';

export class UpdateNewsImageDto extends PartialType(CreateNewsImageDto) {}
