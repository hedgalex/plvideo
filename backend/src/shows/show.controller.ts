import { Controller, Get, ParseIntPipe, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { ShowService } from './show.service';
import { IPageListResult, IShowItem } from '~shared/.ifaces';
import { RECENT_COOKIE_NAME, getRecents } from '../utils/recent';

@Controller('/api')
export class ShowsController {
  constructor(private readonly showsService: ShowService) {}

  @Get('/list')
  async getList(
    @Query('type', ParseIntPipe) type: number,
    @Query('page', ParseIntPipe) page = 1,
  ): Promise<IPageListResult<IShowItem>> {
    return await this.showsService.getList(type, page);
  }

  @Get('/recent')
  async getRecent(@Req() request: Request): Promise<IPageListResult<IShowItem>> {
    const recentCookieValues = request.cookies[RECENT_COOKIE_NAME];
    const recentIds = getRecents(recentCookieValues);

    return await this.showsService.getRecent(recentIds);
  }
}
