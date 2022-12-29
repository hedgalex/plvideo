import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { Repository } from 'typeorm';
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
      items: items.map((item: Shows) => ({
        id: item.id,
        image: item.image,
        title: item.title,
        type,
        year: item.year,
        popularity: item.popularity,
        popularityIncline: item.popularityIncline,
        ratingImdb: item.ratingImdb,
        votedImdb: item.votedImdb,
        resources: [item.ororo && EResource.ORORO, item.ac && EResource.AC, item.imdb && EResource.IMDB].filter(
          (item) => item,
        ),
      })),
      page,
      count: 0,
    };
  }
}
