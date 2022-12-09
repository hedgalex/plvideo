import axios from 'axios';
import parse from 'node-html-parser';
import { Injectable, Logger } from '@nestjs/common';
import { configService } from '~config/config.service';
import { IImdbSearchItem } from './.ifaces/IImdbSearchItem';
import { ISearchItem } from '~shared/.ifaces';
import { EShowTypes } from '../shared/.consts';

@Injectable()
export class SearchService {
  private readonly ororoHeaders: Record<string, string>;
  private readonly animecultHeaders: Record<string, string>;
  private readonly logger = new Logger(SearchService.name);

  constructor() {
    this.ororoHeaders = {
      Cookie: configService.getOroroCookies(),
      'accept-encoding': '',
    };

    this.animecultHeaders = {
      Cookie: configService.getAnimecultCookies(),
      'accept-encoding': '',
    };
  }

  async searchImdb(text: string): Promise<ISearchItem[]> {
    const response = await axios(`https://v3.sg.media-imdb.com/suggestion/x/${text}.json`);
    const items = response?.data?.d?.filter((item: IImdbSearchItem) => item.qid === 'movie' || item.qid === 'tvSeries');

    return items?.map(
      (item: IImdbSearchItem): ISearchItem => ({
        imdbId: item?.id?.replace(/tt/, '') ?? '0',
        providerTypeId: 3,
        title: item?.l ?? '',
        imagePreview: item?.i?.imageUrl,
        type: item.qid === 'movie' ? EShowTypes.MOVIE : EShowTypes.TVSHOW,
        year: item.y,
      }),
    );
  }

  async searchAnimecult(text: string): Promise<ISearchItem[]> {
    const domain = 'https://z.animecult.org';
    const response = await axios(`${domain}/?key=${text}`, {
      headers: this.animecultHeaders,
    });

    const root = parse(response?.data ?? '');
    const resultItems = root.querySelectorAll('.anime-items .anime-item');
    const items =
      resultItems?.map((item) => {
        const link = item.getAttribute('href');
        const title = item.querySelector('.anime-top span')?.text;
        const content =
          item
            .querySelector('.anime-content')
            ?.text.split('\n')
            .filter((item) => !!item) ?? [];

        const details = content.pop()?.split(/\|/) ?? [];
        const episodes = parseInt(details[0]?.replace(/\D*/g, '') ?? '0', 10);
        const imagePreview = `${domain}${item.querySelector('.anime-img')?.getAttribute('src')}`;

        return {
          serviceId: link.replace(/\/(.*?)\/(.*?)/, '$2'),
          title,
          link,
          year: parseInt(details[1]?.replace(/\D*/g, '') ?? '0', 10),
          episodes,
          type: EShowTypes.TVSHOW,
          imagePreview,
        } as ISearchItem;
      }) ?? [];

    return items;
  }

  async searchOroro(text: string): Promise<ISearchItem[]> {
    const response = await axios(`https://ororo.tv/en/api/frontend/search?query=${text}`, {
      headers: this.ororoHeaders,
    });

    const root = parse(response?.data ?? '');
    const resultItems = root.querySelectorAll('.search-results-item');

    const items =
      resultItems?.map((item) => {
        const link = item.getAttribute('href');
        const p = item.querySelectorAll('p');
        const title = p?.[0]?.text ?? '';
        const details = (p?.[1]?.text ?? '').split(/,/);
        const year = parseInt(details?.[1]?.trim() ?? '0', 10);
        const type = details?.[0]?.replace(/\s*/, '').toLowerCase() ?? '';
        if (type !== 'tvshow' && type !== 'movie') {
          return null;
        }

        return {
          serviceId: link.replace(/\/(shows|movies)\/(.*?)/, '$2'),
          providerTypeId: 1,
          title,
          type: type === 'movie' ? EShowTypes.MOVIE : EShowTypes.TVSHOW,
          year,
          link,
        } as ISearchItem;
      }) ?? [];

    return items.filter((item) => item !== null);
  }
}
