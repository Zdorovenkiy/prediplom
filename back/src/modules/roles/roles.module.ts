import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { roles } from 'src/models';

@Module({
  imports: [SequelizeModule.forFeature([roles])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
