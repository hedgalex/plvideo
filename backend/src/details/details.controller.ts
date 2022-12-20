import { Controller, Get, ParseEnumPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { DetailsService } from './details.service';
import { IPageDetails } from '~shared/.ifaces';
import { EResource } from '~shared/.consts';

@Controller('/api/details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Get()
  async getDetails(@Query('showId', ParseIntPipe) showId: number): Promise<IPageDetails> {
    return await this.detailsService.getDetails(showId);
  }

  @Post()
  async addDetails(
    @Query('resource', new ParseEnumPipe(EResource)) resource: EResource,
    @Query('resourceShowId') resourceShowId: string,
  ): Promise<void> {
    switch (resource) {
      case EResource.IMDB: {
        await this.detailsService.getDetailsImdb(resourceShowId);
      }
      case EResource.ORORO: {
        await this.detailsService.getDetailsOroro(resourceShowId);
      }
      case EResource.AC: {
        await this.detailsService.getDetailsAnimeCult(resourceShowId);
      }
    }
  }
}
