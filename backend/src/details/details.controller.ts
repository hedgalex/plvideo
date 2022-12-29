import { Body, Controller, Get, HttpStatus, ParseEnumPipe, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DetailsService } from './details.service';
import { IPageShowInfo } from '~shared/.ifaces';
import { EResource } from '~shared/.consts';

@Controller('/api/details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Get()
  async getDetails(@Query('id', ParseIntPipe) id: number): Promise<IPageShowInfo> {
    return await this.detailsService.getDetails(id);
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
