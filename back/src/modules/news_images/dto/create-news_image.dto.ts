import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNewsImageDto {
  @IsString()
  @IsNotEmpty({ message: 'Название изображения не может быть пустым' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Путь к изображению не может быть пустым' })
  image!: string;
}
