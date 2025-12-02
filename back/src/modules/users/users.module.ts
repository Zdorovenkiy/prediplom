import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { users } from 'src/models';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([users])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
