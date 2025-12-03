import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsOptional, Min, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from 'src/modules/order_products/dto/create-order_product.dto';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty({ message: 'ID пользователя обязателен' })
  @Type(() => Number)
  user_id!: number;

  @IsNotEmpty({ message: 'Общая сумма обязательна' })
  total!: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  is_payed?: boolean = false;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  products!: CreateOrderProductDto[];
}
