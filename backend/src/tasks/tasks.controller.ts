import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseEnumPipe,
  ParseIntPipe,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Response } from 'express';
import { EResource, ETaskStatus } from '~shared/.consts';
import { ITask } from '~shared/.ifaces';

@Controller('/api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<ITask[]> {
    const allTasks = await this.tasksService.getAllTasks();
    return (
      allTasks?.map((task) => ({
        id: task.id,
        hash: Number(task.hash),
        title: task.show?.title,
        subtitle: task.title,
        image: task.show?.image,
        started: task.started,
        finished: task.finished,
        size: task.size,
        downloaded: task.downloaded,
        resource: task.downloadResource.name as EResource,
        taskStatus: task.taskStatus.name as ETaskStatus,
      })) ?? []
    );
  }

  @Put()
  async addTask(
    @Res() response: Response,
    @Body('resource', new ParseEnumPipe(EResource)) resource: EResource,
    @Body('resourceShowId') resourceShowId: string,
    @Body('resourceEpisodeId') resourceEpisodeId: string,
  ): Promise<void> {
    switch (resource) {
      case EResource.ORORO: {
        await this.tasksService.addOroroTask(resourceShowId, resourceEpisodeId);
        break;
      }
      case EResource.AC: {
        await this.tasksService.addAnimeCultTask(resourceShowId, resourceEpisodeId);
        break;
      }
      default: {
        response.status(HttpStatus.METHOD_NOT_ALLOWED).send();
        return;
      }
    }

    response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete()
  async removeTask(@Res() response: Response, @Query('hash', ParseIntPipe) hash: number): Promise<void> {
    const result = await this.tasksService.removeTask(hash);
    console.info(result);
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
