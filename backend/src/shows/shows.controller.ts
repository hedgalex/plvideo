import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { IPageListResult, IShowItem } from '~shared/.ifaces';

@Controller('/api/list')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Get()
  async getList(
    @Query('type', ParseIntPipe) type: number,
    @Query('page', ParseIntPipe) page = 1,
  ): Promise<IPageListResult<IShowItem>> {
    return await this.showsService.getList(type, page);
  }
}
