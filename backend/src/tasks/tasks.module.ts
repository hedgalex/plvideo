import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DownloadService } from '../downloads/download.service';
import { Tasks } from '../entities/tasks.entity';
import { TaskStatuses } from '../entities/taskStatuses.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, TaskStatuses])],
  providers: [TasksService, DownloadService],
  controllers: [TasksController],
})
export class TasksModule {}
