import { Body, Controller, Delete, Get, HttpStatus, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DetailsService } from './details.service';
import { RECENT_COOKIE_NAME, addRecent } from '../utils/recent';
import { ShowService } from '../shows/show.service';

@Controller('/api/details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService, private readonly showService: ShowService) {}

  @Get()
  async getDetails(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
    @Query('id', ParseIntPipe) id: number,
  ): Promise<void> {
    const result = await this.detailsService.getDetails(id);
    const oldCookies = request.cookies[RECENT_COOKIE_NAME];
    const newCookies = addRecent(id, oldCookies);
    if (oldCookies !== newCookies) {
      response.setCookie(RECENT_COOKIE_NAME, newCookies);
    }

    response.status(HttpStatus.OK).send(result);
    return;
  }

  @Get('/torrent')
  async getDetailsByShowId(): Promise<void> {
    this.detailsService.getDetailsTorrent();
    return;
  }

  @Delete()
  async deleteDetails(@Res() response: Response, @Body('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.detailsService.deleteDetails(id);
      response.status(HttpStatus.ACCEPTED).send();
    } catch (e) {
      response.status(HttpStatus.METHOD_NOT_ALLOWED).send(e);
    }
  }

  @Post('/type')
  async changeType(@Res() response: Response, @Body('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.detailsService.changeType(id);
      response.status(HttpStatus.ACCEPTED).send(await this.detailsService.getDetails(id));
    } catch (e) {
      response.status(HttpStatus.METHOD_NOT_ALLOWED).send(e);
    }
  }

  @Put()
  async saveTitle(
    @Res() response: Response,
    @Body('id', ParseIntPipe) id: number,
    @Body('title') title: string,
  ): Promise<void> {
    try {
      await this.detailsService.saveTitle(id, title);
      response.status(HttpStatus.ACCEPTED).send(title);
    } catch (e) {
      response.status(HttpStatus.METHOD_NOT_ALLOWED).send(e);
    }
  }
}
