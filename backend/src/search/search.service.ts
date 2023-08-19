import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { IImdbSearchItem } from './.ifaces/IImdbSearchItem';
import { ISearchResultItem, ISources } from '~shared/.ifaces';
import { EResource, EShowTypes } from '../shared/.consts';
import { hashShowId } from '../utils/hash';
import { ShowService } from '../shows/show.service';
import { searchShowInOroro } from './utils/searchOroro';
import { Episodes } from '../entities/episodes';
import { Shows } from '../entities/shows';
import { ISearchOptions } from './.ifaces/ISearchOptions';
import { searchShowInTorrent } from './utils/searchTorrent';
import { searchShowInAC } from './utils/searchAC';

@Injectable()
export class SearchService {
  constructor(@Inject(ShowService) private readonly showService: ShowService) {}

  async search(text: string): Promise<ISearchResultItem[]> {
    const response = await axios(`https://v3.sg.media-imdb.com/suggestion/x/${text}.json`);
    const items = response?.data?.d?.filter((item: IImdbSearchItem) => item.qid === 'movie' || item.qid === 'tvSeries');

    return items?.map((item: IImdbSearchItem): ISearchResultItem => {
      const title = item?.l ?? '';
      return {
        id: hashShowId(title, item.y),
        title,
        image: item?.i?.imageUrl,
        type: item.qid === 'movie' ? EShowTypes.MOVIE : EShowTypes.TVSHOW,
        year: item.y,
        popularity: item.rank,
        imdb: item?.id,
      };
    });
  }

  private getOptions(entity: Shows | Episodes): ISearchOptions {
    if (entity instanceof Shows) {
      return { type: entity.type, year: entity.year };
    }

    if (entity instanceof Episodes) {
      return { episode: entity.episode, season: entity.season };
    }
  }

  async searchSources(cardId: number): Promise<ISources> {
    const show = await this.showService.getShowEntityById(cardId);
    const entity = show ? show : await this.showService.getEpisodeEntityById(cardId);

    if (!entity) {
      return {};
    }

    const options = this.getOptions(entity);

    const sourceOroro = await searchShowInOroro(entity.title, options);
    const sourceTorrent = await searchShowInTorrent(entity.title, options);
    const sourceAC = await searchShowInAC(entity.title, options);

    return {
      ...(sourceOroro?.length ? { [EResource.ORORO]: sourceOroro } : {}),
      ...(sourceTorrent?.length ? { [EResource.TORRENT]: sourceTorrent } : {}),
      ...(sourceAC?.length ? { [EResource.AC]: sourceAC } : {}),
    };
  }
}
