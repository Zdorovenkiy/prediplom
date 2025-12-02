import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty({ message: 'Фамилия не может быть пустой' })
  surname!: string;

  @IsString()
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  name!: string;

  @IsEmail({}, { message: 'Некорректный email адрес' })
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Заголовок не может быть пустым' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Сообщение не может быть пустым' })
  message!: string;
}
