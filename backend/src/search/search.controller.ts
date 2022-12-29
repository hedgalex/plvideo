import { Controller, Get, ParseEnumPipe, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { EResource } from '~shared/.consts';
import { IPageListResult, IShowItem } from '~shared/.ifaces';

@Controller('/api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchImdb(
    @Query('searchText') text: string,
    @Query('resource', new ParseEnumPipe(EResource)) resource: EResource,
  ): Promise<IPageListResult<IShowItem>> {
    switch (resource) {
      case EResource.IMDB: {
        const items = await this.searchService.searchImdb(text);
        return { items };
      }
      case EResource.ORORO: {
        const items = await this.searchService.searchOroro(text);
        return { items };
      }
      case EResource.AC: {
        const items = await this.searchService.searchAnimecult(text);
        return { items };
      }
      default:
        return { items: [] };
    }
  }
}
