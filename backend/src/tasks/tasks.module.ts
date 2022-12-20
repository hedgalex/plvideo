import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailsService } from '../details/details.service';
import { DownloadService } from '../downloads/download.service';
import { Tasks } from '../entities/tasks';
import { TaskStatuses } from '../entities/taskStatuses';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, TaskStatuses])],
  providers: [TasksService, DownloadService, DetailsService],
  controllers: [TasksController],
})
export class TasksModule {}
