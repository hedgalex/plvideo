import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { IPageSearchResult } from '~shared/.ifaces';
import { EServices } from '~shared/.consts';

@Controller('/api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchImdb(
    @Query('searchText') text: string,
    @Query('service') service: EServices,
  ): Promise<IPageSearchResult> {
    switch (service) {
      case EServices.IMDB: {
        const items = await this.searchService.searchImdb(text);
        return { items };
      }
      case EServices.ORORO: {
        const items = await this.searchService.searchOroro(text);
        return { items };
      }
      case EServices.AC: {
        const items = await this.searchService.searchAnimecult(text);
        return { items };
      }
      default:
        return { items: [] };
    }
  }
}
