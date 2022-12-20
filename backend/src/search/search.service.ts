import axios from 'axios';
import parse from 'node-html-parser';
import { Injectable } from '@nestjs/common';
import { configService } from '~config/config.service';
import { IImdbSearchItem } from './.ifaces/IImdbSearchItem';
import { IShowItem } from '~shared/.ifaces';
import { EResource, EShowTypes } from '../shared/.consts';
import { hashShowId } from '../utils/hash';

@Injectable()
export class SearchService {
  private readonly ororoHeaders: Record<string, string>;
  private readonly animecultHeaders: Record<string, string>;

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

  async searchImdb(text: string): Promise<IShowItem[]> {
    const response = await axios(`https://v3.sg.media-imdb.com/suggestion/x/${text}.json`);
    const items = response?.data?.d?.filter((item: IImdbSearchItem) => item.qid === 'movie' || item.qid === 'tvSeries');

    return items?.map((item: IImdbSearchItem): IShowItem => {
      const title = item?.l ?? '';
      return {
        resource: EResource.IMDB,
        title,
        hash: hashShowId(title, item.y),
        imagePreview: item?.i?.imageUrl,
        type: item.qid === 'movie' ? EShowTypes.MOVIE : EShowTypes.TVSHOW,
        year: item.y,
        resourceShowId: item?.id,
      };
    });
  }

  async searchAnimecult(text: string): Promise<IShowItem[]> {
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
        const resourceShowId = link.replace(/\/(.*?)\/(.*?)/, '$2');
        const year = parseInt(details[1]?.replace(/\D*/g, '') ?? '0', 10);

        return {
          resourceShowId,
          hash: hashShowId(title, year),
          resource: EResource.AC,
          title,
          year,
          episodes,
          type: EShowTypes.TVSHOW,
          imagePreview,
        } as IShowItem;
      }) ?? [];

    return items;
  }

  async searchOroro(text: string): Promise<IShowItem[]> {
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
        const imagePreview = item.querySelector('.search-results-item-image img')?.getAttribute('src');
        if (type !== 'tv show' && type !== 'movie') {
          return null;
        }

        const resourceShowId = link;

        return {
          imagePreview,
          resourceShowId: resourceShowId.substring(1).replace(/\//, '-'),
          hash: hashShowId(title, year),
          resource: EResource.ORORO,
          title,
          type: type === 'movie' ? EShowTypes.MOVIE : EShowTypes.TVSHOW,
          year,
        } as IShowItem;
      }) ?? [];

    return items.filter((item) => item !== null);
  }
}
