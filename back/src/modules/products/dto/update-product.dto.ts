import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, MaxLength, Min, IsArray, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateProductImageDto } from 'src/modules/product_images/dto/create-product_image.dto';

// Вариант 1: Наследование от CreateProductDto с PartialType
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock?: number;
}

export class UpdateProductDtoManual {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Описание товара не должно превышать 255 символов' })
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number | string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Количество товара не может быть отрицательным' })
  stock?: number;

  @IsOptional()
  @IsString()
  description_short?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return value;
 
    return Boolean(value);
  })
  is_discount?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  images?: CreateProductImageDto[];
}
