import axios from 'axios';
import parse, { HTMLElement } from 'node-html-parser';
import { Injectable } from '@nestjs/common';
import { EFileTypes, EShowTypes } from '~shared/.consts';
import { Shows } from '~entities/shows';
import { Episodes } from '~entities/episodes';
import { hash } from '~server/utils/hash';
import { FilterOptions } from '~server/common/.ifaces';
import { EHeaders, defaultHeaders } from '~server/common/.consts';
import { Headers } from '~server/common/.ifaces';
import { configService } from '~config/config.service';
import { SourceContentItem } from '../../shared/.ifaces';

const MOVIE_REGEXP = /^\/movies*/i;

const getShowType = (type: string): EShowTypes | undefined => {
  if (type === 'Movie') {
    return EShowTypes.MOVIE;
  }

  if (type === 'TV Show') {
    return EShowTypes.TVSHOW;
  }

  return;
};

@Injectable()
export class OroroService {
  headers: Headers;

  constructor() {
    this.headers = {
      ...defaultHeaders,
      [EHeaders.Cookie]: configService.getOroroCookies(),
    };
  }

  private async callOroro(url = ''): Promise<string> {
    const { data = '' } = await axios(`https://ororo.tv${url}`, {
      headers: this.headers,
    });

    return data;
  }

  private async callOroroAndParse(url = ''): Promise<HTMLElement> {
    const data = await this.callOroro(url);
    return parse(data ?? '');
  }

  private async searchOroro(show: Shows, { filterUserView = false }): Promise<SourceContentItem[]> {
    const doc = await this.callOroroAndParse(`/api/frontend/search?query=${encodeURIComponent(show.title)}`);

    const items = doc.querySelectorAll('.search-results-item')?.reduce((accumulator, item) => {
      const type = getShowType(item.querySelector('p:nth-child(2)')?.text?.match(/Movie|TV Show/i)?.[0] ?? '');
      if (!type) {
        return accumulator;
      }

      const ororoId = item.getAttribute('href');
      const name = item.querySelector('p:nth-child(1)')?.text ?? '';
      const year = Number.parseInt(item.querySelector('p:nth-child(2)')?.text?.match(/\d{4}/)?.[0] ?? '0', 10);

      if (year === show.year && type === show.type && name === show.title) {
        accumulator.push({
          id: hash(ororoId),
          name,
          ...(filterUserView ? {} : { sourceId: ororoId }),
        });
      }

      return accumulator;
    }, []);

    return items;
  }

  public async getShows(show: Shows, { filterUserView = false }): Promise<SourceContentItem[]> {
    if (show.type === EShowTypes.TVSHOW) {
      return [];
    }

    return this.searchOroro(show, { filterUserView });
  }

  public async getEpisode(show: Shows, episode: Episodes, { filterUserView = false }): Promise<SourceContentItem[]> {
    const shows = await this.searchOroro(show, { filterUserView: false });
    if (shows?.length === 0) {
      return shows;
    }

    const doc = await this.callOroroAndParse(shows[0]?.sourceId);
    const episodeElement = doc?.querySelector(`[href="#${episode.season}-${episode.episode}"]`);
    const id = episodeElement?.getAttribute('data-href');
    const title = episodeElement?.getAttribute('data-title');
    if (id) {
      return [
        {
          id: hash(id),
          name: title,
          episode: episode.episode,
          season: episode.season,
          ...(filterUserView ? {} : { sourceId: id }),
        },
      ];
    }

    return [];
  }

  private getSubtitles(element: HTMLElement, { filterUserView = false }): SourceContentItem[] {
    const subtitles = element?.querySelectorAll('.js-subtitle-download')?.reduce((accumulator, subtitle) => {
      const name = subtitle.getAttribute('title')?.replace(/Download./, '');
      if (name?.includes('English') || name?.includes('Russian')) {
        const id = subtitle.getAttribute('href');
        accumulator.push({
          id: hash(id),
          name,
          type: EFileTypes.SUBTITLES,
          ...(filterUserView ? {} : { sourceId: id }),
        });
      }

      return accumulator;
    }, []);

    return subtitles;
  }

  private async getMovieDetails(link: string, { filterUserView = false }): Promise<SourceContentItem[]> {
    const doc = await this.callOroroAndParse(link);
    const title = doc?.querySelector('.show-content__title')?.text ?? '';

    console.info('filterUserView', filterUserView);

    return [
      {
        id: hash(link),
        name: title,
        type: EFileTypes.MOVIE,
        ...(filterUserView ? {} : { sourceId: link }),
      },
      ...this.getSubtitles(doc, { filterUserView }),
    ];
  }

  private async getShowDetails(link: string, { filterUserView = false }): Promise<SourceContentItem[]> {
    const episodeId = link?.split('/')?.slice(-1)[0];
    if (!episodeId) {
      return [];
    }

    const doc = await this.callOroroAndParse(link.replace(/\/videos\/\d*/, ''));
    const episode = doc.querySelector(`.show-content__episode-row[data-id=${episodeId}]`);
    const title = episode?.querySelector('.show-content__episode-link')?.text ?? '';

    return [
      {
        id: hash(link),
        name: title,
        type: EFileTypes.MOVIE,
        ...(filterUserView ? {} : { sourceId: link }),
      },
      ...this.getSubtitles(episode, { filterUserView }),
    ];
  }

  public async getSourceDetails(
    link: string,
    options: FilterOptions = { filterUserView: false },
  ): Promise<SourceContentItem[]> {
    if (MOVIE_REGEXP.test(link)) {
      return await this.getMovieDetails(link, options);
    }

    return await this.getShowDetails(link, options);
  }
}
