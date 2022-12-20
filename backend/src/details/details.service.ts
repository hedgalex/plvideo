import axios from 'axios';
import parse from 'node-html-parser';
import { Injectable } from '@nestjs/common';
import { configService } from '~config/config.service';
import { IEpisode, IPageDetails } from '~shared/.ifaces';
import { EResource, EShowTypes } from '~shared/.consts';
import { hashCode } from '../utils/hash';
import { InjectRepository } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { Repository } from 'typeorm';

@Injectable()
export class DetailsService {
  private readonly ororoHeaders: Record<string, string>;
  private readonly animecultHeaders: Record<string, string>;

  constructor(
    @InjectRepository(Shows)
    private showsRepository: Repository<Shows>,
  ) {
    this.ororoHeaders = {
      Cookie: configService.getOroroCookies(),
      'accept-encoding': '',
    };

    this.animecultHeaders = {
      Cookie: configService.getAnimecultCookies(),
      'accept-encoding': '',
    };
  }

  async getDetailsImdb(resourceShowId: string): Promise<IPageDetails> {
    // const response = await axios(`https://v3.sg.media-imdb.com/suggestion/x/${text}.json`);
    // const items = response?.data?.d?.filter((item: IImdbSearchItem) => item.qid === 'movie' || item.qid === 'tvSeries');

    return {
      title: '',
      image: '',
      episodes: [],
      seasons: [],
      resourceShowId,
      resource: EResource.AC,
      type: EShowTypes.TVSHOW,
      description: '',
      year: 2000,
    };
  }

  async getDetailsAnimeCult(resourceShowId: string): Promise<IPageDetails> {
    const domain = 'https://z.animecult.org';
    const response = await axios(`${domain}/serial/${resourceShowId}`, {
      headers: this.animecultHeaders,
    });

    const root = parse(response?.data ?? '');

    const title = root.querySelector('h1')?.text ?? '';
    const image = root.querySelector('.carousel-item img')?.getAttribute('src');
    const items = root.querySelectorAll('a.chapters-item');
    const details = root.querySelectorAll('.serial-info-row');
    const yearDetails = details.find((item) => item.querySelector('.serial-info-value')?.text?.match(/\d{4}/));
    const year = parseInt(yearDetails?.querySelector('.serial-info-value')?.text ?? '2000', 10);
    const description = root.querySelector('.serial-description')?.text ?? '';
    const typeDetails = details.find((item) => item.querySelector('.badge-success'));
    const type = typeDetails?.querySelector('.badge-success')?.getAttribute('href')?.includes('tv_series')
      ? EShowTypes.TVSHOW
      : EShowTypes.MOVIE;

    const episodes = [] as IEpisode[];
    items?.forEach((item) => {
      if (item.getAttribute('href') === '#') {
        return;
      }

      const title = item.querySelector('.chapters-title').text;
      const episode = item.querySelector('.chapters-number')?.text?.replace(/\D/g, '') ?? '0';

      episodes.push({
        hash: hashCode(`${episode}-${EResource.AC}-${resourceShowId}`),
        season: 1,
        title,
        episode: parseInt(episode, 10),
        resourceEpisodeId: episode,
      });
    });

    episodes.reverse();

    return {
      title: title?.replace(/^\s|\s$/g, ''),
      episodes,
      seasons: [1],
      resourceShowId,
      resource: EResource.AC,
      image: `${domain}${image}`,
      type,
      description,
      year,
    };
  }

  async getDetailsOroro(resourceShowId: string): Promise<IPageDetails> {
    const ororoId = resourceShowId.replace(/(shows|movies)-([\w-]*)/, '/$1/$2');
    const response = await axios(`https://ororo.tv/en/${ororoId}`, {
      headers: this.ororoHeaders,
    });

    const root = parse(response?.data ?? '');
    const title = root.querySelector('.show-content__title')?.text.trim();
    const description = root.querySelector('.show-content__description')?.text.trim();
    const year = parseInt(root.querySelector('#year')?.text.replace(/\D*/g, '') ?? '0', 10);
    const image = root.querySelector('#poster')?.getAttribute('src') ?? '';
    const type = ororoId?.startsWith('/shows') ? EShowTypes.TVSHOW : EShowTypes.MOVIE;

    const seasons = root
      .querySelectorAll('.js-season-link')
      ?.map((season) => parseInt(season?.text.replace(/\D*/g, '') ?? '0', 10));
    const episodes = root.querySelectorAll('.episode-box')?.map((episodeElement) => {
      const link = episodeElement.querySelector('.show-content__episode-link');
      const title = link?.text.trim() ?? '';
      const [season = '0', episode = '0'] = link?.getAttribute('href')?.replace(/#/, '').split('-');
      const resourceEpisodeId = link?.getAttribute('data-id');

      return {
        title,
        episode: parseInt(episode, 10),
        season: parseInt(season, 10),
        hash: hashCode(`${resourceEpisodeId}-${EResource.ORORO}-${resourceShowId}`),
        resourceEpisodeId,
      };
    });

    return {
      title,
      image,
      episodes,
      seasons,
      resourceShowId,
      resource: EResource.ORORO,
      type,
      description,
      year,
    };
  }

  async getDetails(showId: number): Promise<IPageDetails> {
    this.showsRepository.findOne({ where: { id: showId } });
    return null;
  }
}
