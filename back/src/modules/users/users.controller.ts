import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.register(createUserDto);
    console.log("res", res);
    
    return res;
  }

  @Post('auth')
  async auth(    
    @Body('email') email: string,
    @Body('password') password: string
    ) {

        const user = await this.usersService.auth(email, password);
        
        if (!user) throw new HttpException('Пользователя не существует', HttpStatus.BAD_REQUEST); 

        return user
  }

    @Post('recover')
    async recoverPassword(@Body('email') email: string) {
        try {
            if (!email) {
                throw new HttpException('Email обязателен', HttpStatus.BAD_REQUEST);
            }

            const result = await this.usersService.sendPasswordEmail(email);
            
            if (!result.success) {
                throw new HttpException(result.message, HttpStatus.NOT_FOUND);
            }
            
            return result.message;
        } catch (error) {
            throw new HttpException(
                'Ошибка при отправке email',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
  }
}
