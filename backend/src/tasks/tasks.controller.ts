import { Controller, Get } from '@nestjs/common';
import { Tasks } from '../entities/tasks.entity';
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Partial<Tasks>[]> {
    const allTasks = await this.tasksService.getAllTasks();
    console.info(allTasks);
    return (
      allTasks?.map((task) => ({
        id: task.id,
        imdbId: task.imdbId,
        started: task.started,
        finished: task.finished,
        size: task.size,
        downloaded: task.downloaded,
        downloadResource: task.downloadResource,
        taskStatus: task.taskStatus,
      })) ?? []
    );
  }
}
