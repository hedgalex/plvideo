import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { IListResult, IShowItem } from '~shared/.ifaces';
import { ShowService } from '../shows/show.service';

@Controller('/api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService, private readonly showsService: ShowService) {}

  @Get()
  async search(@Query('searchText') text: string): Promise<IListResult<IShowItem>> {
    const searchResult = await this.searchService.search(text);
    const ids = await this.showsService.addOrUpdate(searchResult, ['popularity']);
    const items = await this.showsService.getListByIds(ids);

    return { items };
  }
}
