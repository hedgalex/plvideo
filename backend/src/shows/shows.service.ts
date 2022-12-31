import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { In, Repository } from 'typeorm';
import { EResource, EShowTypes } from '~shared/.consts';
import { IPageListResult, IShowItem } from '~shared/.ifaces';

const PER_PAGE = 50;

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Shows)
    private showsRepository: Repository<Shows>,
  ) {}

  async getList(type: EShowTypes, page: number): Promise<IPageListResult<IShowItem>> {
    const items = await this.showsRepository.find({
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
      const items = await this.showsRepository.find({ where: { id: In(recentIds) } });
      return {
        items: items.map(({ ororo, ac, imdb, ...item }: Shows) => ({
          ...item,
          resources: [ororo && EResource.ORORO, ac && EResource.AC, imdb && EResource.IMDB].filter((item) => item),
        })),
      };
    }

    return { items: [], page: 0, count: 0 };
  }
}
