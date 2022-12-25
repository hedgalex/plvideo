import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailsService } from '../details/details.service';
import { DownloadService } from '../downloads/download.service';
import { Tasks } from '../entities/tasks';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Shows } from '../entities/shows';
import { Episodes } from '../entities/episodes';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, Shows, Episodes])],
  providers: [TasksService, DownloadService, DetailsService],
  controllers: [TasksController],
})
export class TasksModule {}
