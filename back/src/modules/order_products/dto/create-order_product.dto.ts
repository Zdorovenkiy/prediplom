import { Type } from 'class-transformer';
import { IsDecimal, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateOrderProductDto {
  @IsInt()
  @IsNotEmpty({ message: 'ID продукта обязателен' })
  @Type(() => Number)
  product_id!: number;

  @IsOptional()
  @IsInt()
  @IsNotEmpty({ message: 'ID заказа обязателен' })
  @Type(() => Number)
  order_id!: number;

  @IsOptional()
  name!: string;

  @IsInt()
  @IsNotEmpty({ message: 'Количество обязательно' })
  @Min(1, { message: 'Количество должно быть не менее 1' })
  @Type(() => Number)
  quantity!: number;

  @IsNotEmpty({ message: 'Цена обязательна' })
  price!: string;
}
