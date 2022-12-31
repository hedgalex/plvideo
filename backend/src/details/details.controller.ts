import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FastifyReply, FastifyRequest } from 'fastify';
import { EResource } from '~shared/.consts';
import { DetailsService } from './details.service';
import { RECENT_COOKIE_NAME, addRecent } from '../utils/recent';

@Controller('/api/details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

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

  @Post('/add')
  async addDetails(
    @Res() response: Response,
    @Body('resource', new ParseEnumPipe(EResource)) resource: EResource,
    @Body('resourceShowId') resourceShowId: string,
    @Body('showId', ParseIntPipe) id: number,
    @Query('force') force?: boolean,
  ): Promise<void> {
    try {
      await this.detailsService.updateShowDetails(resource, id, resourceShowId, force);
      response.status(HttpStatus.CREATED).send();
    } catch (e) {
      response.status(HttpStatus.METHOD_NOT_ALLOWED).send(e);
    }
  }

  @Post('/update')
  async updateDetails(
    @Res() response: Response,
    @Body('id', ParseIntPipe) id: number,
    @Body('resource', new ParseEnumPipe(EResource)) resource: EResource,
  ): Promise<void> {
    try {
      await this.detailsService.updateShowDetails(resource, id, undefined, !!resource);
      response.status(HttpStatus.CREATED).send(await this.detailsService.getDetails(id));
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
