import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, MaxLength, Min, IsDecimal, Validate } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Название товара не может быть пустым' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Описание товара не может быть пустым' })
  @MaxLength(255, { message: 'Описание товара не должно превышать 255 символов' })
  description!: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Цена товара не может быть пустой' })
  price!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Количество товара не может быть отрицательным' })
  stock!: number;

  @IsOptional()
  @IsString()
  description_short?: string;

  @IsOptional()
  @IsBoolean()
  is_discount: boolean = false;
}
