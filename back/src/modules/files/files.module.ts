import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { files } from 'src/models';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([files])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
