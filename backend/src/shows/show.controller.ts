import { Controller, Get, HttpStatus, ParseIntPipe, Query, Param, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { FastifyReply } from 'fastify';
import { ShowService } from './show.service';
import { IListResult, IShowItem } from '~shared/.ifaces';
import { RECENT_COOKIE_NAME, getRecents } from '../utils/recent';

@Controller('/api')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get('/show/:cardId')
  async getShow(@Res() response: FastifyReply, @Param('cardId', ParseIntPipe) showId: number): Promise<void> {
    const result = await this.showService.getShowFiltered(showId);
    response.status(HttpStatus.OK).send(result);
    return;
  }

  @Get('/list')
  async getList(
    @Query('type', ParseIntPipe) type: number,
    @Query('page', ParseIntPipe) page = 1,
  ): Promise<IListResult<IShowItem>> {
    return await this.showService.getList(type, page);
  }

  @Get('/recent')
  async getRecent(@Req() request: Request): Promise<IListResult<IShowItem>> {
    const recentCookieValues = request.cookies[RECENT_COOKIE_NAME];
    const recentIds = getRecents(recentCookieValues);

    return await this.showService.getRecent(recentIds);
  }
}
