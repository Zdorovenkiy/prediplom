import { IsInt, IsNotEmpty, IsOptional, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty({ message: 'ID товара обязателен' })
  @Type(() => Number)
  product_id!: number;

  @IsInt()
  @IsNotEmpty({ message: 'ID пользователя обязателен' })
  @Type(() => Number)
  user_id!: number;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Рейтинг не может быть меньше 0' })
  @Max(5, { message: 'Рейтинг не может быть больше 5' })
  @Type(() => Number)
  rating?: number = 0;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Текст отзыва не может быть пустой строкой' })
  text?: string;
}
