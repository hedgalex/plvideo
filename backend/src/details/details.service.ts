import axios from 'axios';
import parse from 'node-html-parser';
import { Injectable, Logger } from '@nestjs/common';
import { configService } from '~config/config.service';
import { IPageShowInfo } from '~shared/.ifaces';
import { EResource, EShowTypes } from '~shared/.consts';
import { hashEpisodeId, parseIntOrZero } from '../utils/hash';
import { InjectRepository } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { Repository } from 'typeorm';
import { Episodes } from '../entities/episodes';
import { IDetails } from './.ifaces/IDetails';
import { IDetailsEpisode } from './.ifaces/IDetailsEpisode';
// import { getTorrentInfo } from 'plvideo-torrent';

const DEFAULT_POPULARITY = 999;

@Injectable()
export class DetailsService {
  private readonly logger = new Logger(DetailsService.name);
  private readonly ororoHeaders: Record<string, string>;
  private readonly animecultHeaders: Record<string, string>;
  private readonly imdbHeaders: Record<string, string>;

  constructor(
    @InjectRepository(Shows)
    private showsRepository: Repository<Shows>,
    @InjectRepository(Episodes)
    private episodesRepository: Repository<Episodes>,
  ) {
    this.ororoHeaders = {
      Cookie: configService.getOroroCookies(),
      'accept-encoding': '',
    };

    this.animecultHeaders = {
      Cookie: configService.getAnimecultCookies(),
      'accept-encoding': '',
    };
    this.imdbHeaders = {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      'accept-encoding': '',
    };
  }

  async getDetailsImdb(id: number, resourceShowId: string): Promise<IDetails> {
    const { data } = await axios(`https://www.imdb.com/title/${resourceShowId}/`, {
      headers: this.imdbHeaders,
    });

    const root = parse(data ?? '');

    const t = JSON.parse(root.querySelector('#__NEXT_DATA__')?.text ?? '{}');
    const showData = t?.props?.pageProps?.aboveTheFoldData ?? {};

    const title = showData.titleText?.text ?? '';
    const type = showData.titleType?.id === 'tvSeries' ? EShowTypes.TVSHOW : EShowTypes.MOVIE;
    const year = showData.releaseYear?.year;
    const image = showData.primaryImage?.url;
    const description = showData.plot?.plotText?.plainText ?? '';
    const ratingImdb = showData.ratingsSummary?.aggregateRating ?? 0;
    const votedImdb = showData.ratingsSummary?.voteCount ?? 0;
    const currentRank = showData.meterRanking?.currentRank ?? 0;
    const rankIncline =
      showData.meterRanking?.rankChange?.difference *
      (showData.meterRanking?.rankChange?.changeDirection === 'DOWN' ? -1 : 1);

    const episodes = [] as IDetailsEpisode[];

    if (type === EShowTypes.TVSHOW) {
      for await (const yearItem of t?.props?.pageProps?.mainColumnData?.episodes?.years ?? []) {
        const { data: seasonData } = await axios(
          `https://www.imdb.com/title/${resourceShowId}/episodes/_ajax?year=${yearItem.year ?? 1}`,
        );

        const episodesData = parse(seasonData ?? '');
        episodesData.querySelectorAll('div.list_item')?.forEach((episodeItem) => {
          const link = episodeItem.querySelector('.image a');
          const episodeTitle = link.getAttribute('title');
          const divElement = link.querySelector('div');
          const imdbCode = divElement.getAttribute('data-const');
          const [, seasonNumber, episodeNumber] = divElement.querySelector('div')?.text?.match(/S(\d+),\sEp(\d+)/);
          const season = parseIntOrZero(seasonNumber?.[1]);
          const episode = parseIntOrZero(episodeNumber?.[2]);
          const releaseTime = episodeItem.querySelector('.airdate')?.text ?? '';
          const release = releaseTime ? new Date(releaseTime).getTime() : 0;

          episodes.push({
            id: hashEpisodeId(title, year, season, episode),
            title: episodeTitle,
            showId: id,
            episode,
            season,
            imdb: imdbCode,
            release: Number.isNaN(release) ? 0 : release,
          });
        });
      }
    }

    return {
      id,
      title,
      image,
      imdb: resourceShowId,
      episodes: episodes.reduce((accumulator, current) => {
        const existingObject = accumulator.find(({ id }) => id === current.id);

        if (!existingObject) {
          accumulator.push(current);
        }

        return accumulator;
      }, []),
      resource: EResource.IMDB,
      type,
      description,
      year,
      popularity: currentRank > DEFAULT_POPULARITY ? DEFAULT_POPULARITY : currentRank,
      popularityIncline: rankIncline,
      votedImdb,
      ratingImdb,
    };
  }

  async getDetailsAnimeCult(id: number, resourceShowId: string): Promise<IDetails> {
    const domain = 'https://z.animecult.org';
    const response = await axios(`${domain}/serial/${resourceShowId}`, {
      headers: this.animecultHeaders,
    });

    const root = parse(response?.data ?? '');

    const title = root.querySelector('meta[itemprop=name]')?.getAttribute('content') ?? '';
    const image = root.querySelector('.carousel-item img')?.getAttribute('src');
    const items = root.querySelectorAll('a.chapters-item');
    const details = root.querySelectorAll('.serial-info-row');
    const yearDetails = details.find((item) => item.querySelector('.serial-info-value')?.text?.match(/\d{4}/));
    const year = parseIntOrZero(yearDetails?.querySelector('.serial-info-value')?.text ?? '2000');
    const description = root.querySelector('.serial-description')?.text ?? '';
    const typeDetails = details.find((item) => item.querySelector('.badge-success'));
    const type = typeDetails?.querySelector('.badge-success[href*="tv_series"]') ? EShowTypes.TVSHOW : EShowTypes.MOVIE;
    const episodes = [] as IDetailsEpisode[];
    items?.forEach((item) => {
      if (item.getAttribute('href') === '#') {
        return;
      }

      const episodeTitle = item.querySelector('.chapters-title').text;
      const episodeString = item.querySelector('.chapters-number')?.text?.replace(/\D/g, '') ?? '0';
      const episode = parseIntOrZero(episodeString);

      episodes.push({
        id: hashEpisodeId(title, year, 1, episode),
        showId: id,
        episode,
        season: 1,
        title: episodeTitle,
        ac: episodeString,
      });
    });

    episodes.reverse();
    return {
      id,
      title: title,
      episodes,
      resource: EResource.AC,
      image: `${domain}${image}`,
      type,
      description: description.trim(),
      year,
      ac: resourceShowId,
    };
  }

  async getDetailsOroro(id: number, resourceShowId: string): Promise<IDetails> {
    const ororoId = resourceShowId.replace(/(shows|movies)-([\w-]*)/, '/$1/$2');
    const response = await axios(`https://ororo.tv/en${ororoId}`, {
      headers: this.ororoHeaders,
    });

    const root = parse(response?.data ?? '');
    const title = root.querySelector('.show-content__title')?.text.trim();
    const description = root.querySelector('.show-content__description')?.text.trim();
    const year = parseIntOrZero(root.querySelector('#year')?.text.replace(/\D*/g, ''));
    const image = root.querySelector('#poster')?.getAttribute('src') ?? '';
    const type = ororoId?.startsWith('/shows') ? EShowTypes.TVSHOW : EShowTypes.MOVIE;
    const episodes =
      root.querySelectorAll('.episode-box')?.map((episodeElement) => {
        const link = episodeElement.querySelector('.show-content__episode-link');
        const episodeTitle = link?.text.trim() ?? '';
        const [seasonString = '0', episodeString = '0'] = link?.getAttribute('href')?.replace(/#/, '').split('-');
        const resourceEpisodeId = link?.getAttribute('data-id');
        const season = parseIntOrZero(seasonString);
        const episode = parseIntOrZero(episodeString);
        return {
          id: hashEpisodeId(title, year, season, episode),
          title: episodeTitle,
          episode,
          season,
          showId: id,
          ororo: resourceEpisodeId,
          release: 0,
        } as IDetailsEpisode;
      }) ?? [];

    return {
      id,
      title,
      image,
      episodes,
      resource: EResource.ORORO,
      type,
      description,
      year,
      ororo: resourceShowId,
    };
  }

  async getDetailsTorrent(): Promise<void> {
    // const magnet =
    //   'magnet:?xt=urn:btih:556BE0BD40C4880E29BA567663C65BD8BAE9FBEB&tr=udp%3A%2F%2Ftracker.bitsearch.to%3A1337%2Fannounce&tr=udp%3A%2F%2Fwww.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.breizh.pm%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&dn=%5Bbitsearch.to%5D+Inside+Out+(2015)+%5B1080p%5D';
    // const path = '/Users/alex/Projects/plvideo/downloads';
    // const result = await getTorrentInfo(magnet, path);
    // console.info(result);
  }

  async getDetails(showId: number): Promise<IPageShowInfo> {
    const show = await this.showsRepository.findOne({
      where: { id: showId },
      relations: {
        episodes: true,
      },
      order: {
        episodes: {
          episode: 'ASC',
        },
      },
    });

    if (!show) {
      return null;
    }

    return {
      ...show,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      episodes: show.episodes.map(({ showId: _showId, ...episode }) => episode),
    };
  }

  private async fetchDetails(id: number, resource: EResource, resourceShowId: string) {
    switch (resource) {
      case EResource.ORORO: {
        return await this.getDetailsOroro(id, resourceShowId);
      }
      case EResource.AC: {
        return await this.getDetailsAnimeCult(id, resourceShowId);
      }
      case EResource.IMDB:
      default: {
        return await this.getDetailsImdb(id, resourceShowId);
      }
    }
  }

  async deleteDetails(id: number): Promise<void> {
    await this.episodesRepository.delete({ showId: id });
    await this.showsRepository.delete({ id });

    return;
  }

  async changeType(id: number): Promise<void> {
    await this.episodesRepository.delete({ showId: id });
    const show = await this.showsRepository.findOne({ where: { id } });
    await this.showsRepository.update(
      {
        id,
      },
      {
        type: EShowTypes.TVSHOW === show.type ? EShowTypes.MOVIE : EShowTypes.TVSHOW,
      },
    );
    return;
  }

  async saveTitle(id: number, title: string): Promise<void> {
    const show = this.showsRepository.findOne({ where: { id } });
    if (!show) {
      throw new Error(`Could not change title. The show with id ${id} is not found.`);
    }

    await this.showsRepository.update({ id }, { title });
  }
}
