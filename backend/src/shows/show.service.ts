/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Shows } from '~entities/shows';
import { Episodes } from '~entities/episodes';
import { EResource, EShowTypes } from '~shared/.consts';
import { IListResult, ISearchResultItem, IShowItem, ShowFiltered } from '~shared/.ifaces';
import { ImdbService } from '../sources/services/imdb.service';

const PER_PAGE = 50;
const DAY = 1000 * 60 * 60 * 24;

@Injectable()
export class ShowService {
  constructor(
    private readonly imdbService: ImdbService,
    @InjectRepository(Shows)
    private showRepository: Repository<Shows>,
    @InjectRepository(Episodes)
    private episodeRepository: Repository<Episodes>,
  ) {}

  async getList(type: EShowTypes, page: number): Promise<IListResult<IShowItem>> {
    const items = await this.showRepository.find({
      where: { type },
      skip: (page - 1) * PER_PAGE,
      take: page * PER_PAGE,
      order: { popularity: { direction: 'ASC' } },
    });

    return {
      items: items.map(({ imdb, ...item }: Shows) => ({
        ...item,
        resources: [imdb && EResource.IMDB].filter((item) => item),
      })),
      page,
      count: 0,
    };
  }

  async getRecent(recentIds: number[]): Promise<IListResult<IShowItem>> {
    if (recentIds.length > 0) {
      const items = await this.showRepository.find({ where: { id: In(recentIds) } });
      return {
        items: items.map(({ imdb, ...item }: Shows) => ({
          ...item,
          resources: [imdb && EResource.IMDB].filter((item) => item),
        })),
      };
    }

    return { items: [], page: 0, count: 0 };
  }

  async getListByIds(
    ids: number[],
    options: { type?: EShowTypes; page?: number; total?: number } = { page: 1, total: PER_PAGE },
  ): Promise<IShowItem[]> {
    const queryBuilder = this.showRepository.createQueryBuilder();
    queryBuilder
      .select()
      .where({ id: In(ids) })
      .skip((options.page - 1) * options.total)
      .take(options.page * options.total);

    if (options.type) {
      queryBuilder.andWhere({ type: options.type });
    }

    const items = await queryBuilder.getMany();

    return items.map(({ imdb, ...item }: Shows) => ({
      ...item,
      resources: [imdb && EResource.IMDB].filter((item) => item),
    }));
  }

  async getShowEntityById(id: number): Promise<Shows> {
    const showQueryBuilder = this.showRepository.createQueryBuilder();
    const show = await showQueryBuilder.select().where({ id }).getOne();
    if (!show) {
      return null;
    }

    return show;
  }

  async getEpisodeEntityById(id: number): Promise<Episodes> {
    const episodeQueryBuilder = this.episodeRepository.createQueryBuilder();
    const episode = await episodeQueryBuilder.select().where({ id }).getOne();
    if (!episode) {
      return null;
    }

    return episode;
  }

  async addOrUpdate(shows: ISearchResultItem[], updateFields: string[]): Promise<number[]> {
    if (shows.length === 0) {
      return;
    }

    const queryBuilder = this.showRepository.createQueryBuilder();
    const ids = await queryBuilder.insert().into(Shows).values(shows).orUpdate(updateFields, 'shows_pkey').execute();

    return ids.identifiers.map(({ id }) => id);
  }

  private async findShow(id: number): Promise<Shows> {
    return await this.showRepository.findOne({
      where: { id },
      relations: {
        episodes: true,
      },
      order: {
        episodes: {
          episode: 'ASC',
        },
      },
    });
  }

  private async getShow(id: number, options: { forceUpdate?: boolean } = { forceUpdate: false }): Promise<Shows> {
    const foundShow = await this.findShow(id);

    if (foundShow?.sync > Date.now() - DAY && !options.forceUpdate) {
      return foundShow;
    }

    const showData = await this.imdbService.getShow(foundShow.imdb);

    if (showData.type === EShowTypes.TVSHOW) {
      const episodes = await this.imdbService.getEpisodes(id, foundShow.imdb);
      await this.addOrUpdateEpisodes(episodes);
    }

    await this.showRepository.update({ id }, { sync: Date.now() });

    return await this.findShow(id);
  }

  public async getShowFiltered(id: number): Promise<ShowFiltered> {
    const show = await this.getShow(id);
    if (!show) {
      return null;
    }

    const { imdb, ...filteredShow } = show;
    return filteredShow;
  }

  async addOrUpdateEpisodes(episodes: Episodes[]): Promise<void> {
    if (episodes.length === 0) {
      return;
    }

    const queryBuilder = this.episodeRepository.createQueryBuilder();
    await queryBuilder.insert().into(Episodes).values(episodes).orUpdate(['id'], 'episodes_pkey').execute();

    return;
  }
}
