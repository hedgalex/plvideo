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
import { EResource } from '~shared/.consts';
import { IDownload, IListResult, ITask } from '~shared/.ifaces';

@Controller('/api')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/downloads')
  async getDownloads(@Query('showId', ParseIntPipe) showId): Promise<IListResult<IDownload>> {
    return await this.tasksService.getDownloads(showId);
  }

  @Get('/tasks')
  async getAllTasks(): Promise<ITask[]> {
    return await this.tasksService.getAllTasks();
  }

  @Put('/tasks')
  async addTask(
    @Res() response: Response,
    @Body('resource', new ParseEnumPipe(EResource)) resource: EResource,
    @Body('id', ParseIntPipe) id: number,
  ): Promise<void> {
    if (resource === EResource.IMDB) {
      response.status(HttpStatus.METHOD_NOT_ALLOWED).send();
      return;
    }

    try {
      await this.tasksService.addTask(id, resource);
    } catch (e) {
      response.status(HttpStatus.CONFLICT).send(e);
      return;
    }

    response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/tasks')
  async removeTask(@Res() response: Response, @Query('id', ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.removeTask(id);
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
