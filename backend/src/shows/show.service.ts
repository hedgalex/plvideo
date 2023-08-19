import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { In, Repository } from 'typeorm';
import { EResource, EShowTypes } from '~shared/.consts';
import { IPageListResult, ISearchResultItem, IShowItem } from '~shared/.ifaces';
import { Episodes } from '../entities/episodes';

const PER_PAGE = 50;

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Shows)
    private showRepository: Repository<Shows>,
    @InjectRepository(Shows)
    private episodeRepository: Repository<Episodes>,
  ) {}

  async getList(type: EShowTypes, page: number): Promise<IPageListResult<IShowItem>> {
    const items = await this.showRepository.find({
      where: { type },
      skip: (page - 1) * PER_PAGE,
      take: page * PER_PAGE,
      order: { popularity: { direction: 'ASC' } },
    });

    return {
      items: items.map(({ ororo, ac, imdb, ...item }: Shows) => ({
        ...item,
        resources: [ororo && EResource.ORORO, ac && EResource.AC, imdb && EResource.IMDB].filter((item) => item),
      })),
      page,
      count: 0,
    };
  }

  async getRecent(recentIds: number[]): Promise<IPageListResult<IShowItem>> {
    if (recentIds.length > 0) {
      const items = await this.showRepository.find({ where: { id: In(recentIds) } });
      return {
        items: items.map(({ ororo, ac, imdb, ...item }: Shows) => ({
          ...item,
          resources: [ororo && EResource.ORORO, ac && EResource.AC, imdb && EResource.IMDB].filter((item) => item),
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

    return items.map(({ ororo, ac, imdb, ...item }: Shows) => ({
      ...item,
      resources: [ororo && EResource.ORORO, ac && EResource.AC, imdb && EResource.IMDB].filter((item) => item),
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
}
