import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { IImdbSearchItem } from './.ifaces/IImdbSearchItem';
import { ISearchResultItem, SourceContentItem, ISourceItem, ISources } from '~shared/.ifaces';
import { EResource, EShowTypes } from '../shared/.consts';
import { hashShowId } from '../utils/hash';
import { ShowService } from '../shows/show.service';
import { FilterOptions } from '~server/common/.ifaces';
import { TorrentService } from '../sources/services/torrent.service';
import { OroroService } from '../sources/services/ororo.service';

@Injectable()
export class SearchService {
  constructor(
    @Inject(ShowService) private readonly showService: ShowService,
    @Inject(OroroService) private readonly ororoService: OroroService,
    @Inject(TorrentService) private readonly torrentService: TorrentService,
  ) {}

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

  async searchSources(
    cardId: number,
    { filterUserView }: FilterOptions = { filterUserView: false },
  ): Promise<ISources> {
    const episode = await this.showService.getEpisodeEntityById(cardId);
    const showId = episode?.showId ?? cardId;
    const show = await this.showService.getShowEntityById(showId);

    if (!show) {
      return {};
    }

    if (episode) {
      const sourceOroro = await this.ororoService.getEpisode(show, episode, { filterUserView });
      const sourceTorrent = await this.torrentService.getEpisode(show, episode, { filterUserView });

      return {
        ...(sourceOroro?.length ? { [EResource.ORORO]: sourceOroro } : {}),
        ...(sourceTorrent?.length ? { [EResource.TORRENT]: sourceTorrent } : {}),
      };
    }

    const sourceOroro = await this.ororoService.getShows(show, { filterUserView });
    const sourceTorrent = await this.torrentService.getShows(show, { filterUserView });

    return {
      ...(sourceOroro?.length ? { [EResource.ORORO]: sourceOroro } : {}),
      ...(sourceTorrent?.length ? { [EResource.TORRENT]: sourceTorrent } : {}),
    };
  }

  async searchSourceById(
    cardId: number,
    sourceId: number,
    options: FilterOptions = { filterUserView: false },
  ): Promise<SourceContentItem[]> {
    const sources = await this.searchSources(cardId, { filterUserView: false });
    const source = Object.keys(sources).reduce((accumulator: ISourceItem & { key: EResource }, key) => {
      const item = sources[key].find((item: ISourceItem) => item.id === sourceId);

      if (item) {
        accumulator = { key, ...item };
      }

      return accumulator;
    }, {} as ISourceItem & { key: EResource });

    switch (source.key) {
      case EResource.ORORO:
        return await this.ororoService.getSourceDetails(source.sourceId, options);
      case EResource.TORRENT:
        return await this.torrentService.getSourceDetails(source.magnet);
      default:
        return [];
    }
  }

  async addSourcesToDownloadQueue(cardId: number, sourceId: number, fileIds: number[]): Promise<void> {
    const sources = await this.searchSources(cardId, { filterUserView: true });
    const sourceKey = Object.keys(sources).find((key) =>
      sources[key].find((item: ISourceItem) => item.id === sourceId),
    );

    if (!sourceKey) {
      return;
    }

    const source = sources[sourceKey];
    const files = source?.filter((file: ISourceItem) => fileIds.includes(file.id));
    console.info('files', files);

    return;
  }
}
