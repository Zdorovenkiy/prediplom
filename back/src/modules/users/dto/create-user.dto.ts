import { IsString, IsEmail, IsNumber, IsOptional, MinLength, Matches, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString({ message: 'Фамилия должна быть строкой' })
  surname!: string;

  @IsString({ message: 'Имя должно быть строкой' })
  name!: string;

  @IsOptional()
  @IsString({ message: 'Отчество должно быть строкой' })
  patronymic?: string;

  @IsEmail({}, { message: 'Некорректный формат email' })
  @Transform(({ value }) => value.toLowerCase().trim())
  email!: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password!: string;

  @IsString({ message: 'Телефон должен быть строкой' })
//   @Matches(/^[\d\s\-\+\(\)]+$/, { message: 'Некорректный формат телефона' })
  phone!: string;
}