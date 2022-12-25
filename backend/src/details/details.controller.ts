import { Body, Controller, Get, HttpStatus, ParseEnumPipe, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
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

  @Post()
  async addDetails(
    @Res() response: Response,
    @Body('resource', new ParseEnumPipe(EResource)) resource: EResource,
    @Body('resourceShowId') resourceShowId: string,
    @Body('showId', ParseIntPipe) showId: number,
    @Query('force') force?: boolean,
  ): Promise<void> {
    try {
      await this.detailsService.addDetails(resource, resourceShowId, showId, force);
      response.status(HttpStatus.CREATED).send();
    } catch (e) {
      response.status(HttpStatus.METHOD_NOT_ALLOWED).send(e);
    }
  }
}
