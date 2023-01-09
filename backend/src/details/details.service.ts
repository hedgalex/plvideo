import axios from 'axios';
import parse from 'node-html-parser';
import { Injectable, Logger } from '@nestjs/common';
import { configService } from '~config/config.service';
import { IPageShowInfo } from '~shared/.ifaces';
import { EResource, EShowTypes } from '~shared/.consts';
import { hashEpisodeId } from '../utils/hash';
import { InjectRepository } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { Repository } from 'typeorm';
import { Episodes } from '../entities/episodes';
import { IDetails } from './.ifaces/IDetails';
import { IDetailsEpisode } from './.ifaces/IDetailsEpisode';

const DAY = 24 * 60 * 60 * 1000;
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
      for await (const season of t?.props?.pageProps?.mainColumnData?.episodes?.seasons ?? []) {
        const { data: seasonData } = await axios(
          `https://www.imdb.com/title/${resourceShowId}/episodes/_ajax?season=${season.number ?? 1}`,
        );

        const episodesData = parse(seasonData ?? '');

        episodesData.querySelectorAll('div.list_item')?.forEach((episodeItem) => {
          const link = episodeItem.querySelector('.image a');
          const episodeTitle = link.getAttribute('title');
          const divElement = link.querySelector('div');
          const imdbCode = divElement.getAttribute('data-const');
          const episode = parseInt(divElement.querySelector('div')?.text?.replace(/S\d+?,.Ep(\d+?)/g, '$1') ?? '0');
          const seasonNumber = parseInt(season.number, 10);
          const release = new Date(episodeItem.querySelector('.airdate')?.text).getTime();

          episodes.push({
            id: hashEpisodeId(title, year, seasonNumber, episode),
            title: episodeTitle,
            showId: id,
            episode,
            season: seasonNumber,
            imdb: imdbCode,
            release,
          });
        });
      }
    }

    return {
      id,
      title,
      image,
      imdb: resourceShowId,
      episodes,
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
    const year = parseInt(yearDetails?.querySelector('.serial-info-value')?.text ?? '2000', 10);
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
      const episode = parseInt(episodeString, 10);

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
    const year = parseInt(root.querySelector('#year')?.text.replace(/\D*/g, '') ?? '0', 10);
    const image = root.querySelector('#poster')?.getAttribute('src') ?? '';
    const type = ororoId?.startsWith('/shows') ? EShowTypes.TVSHOW : EShowTypes.MOVIE;
    const episodes =
      root.querySelectorAll('.episode-box')?.map((episodeElement) => {
        const link = episodeElement.querySelector('.show-content__episode-link');
        const episodeTitle = link?.text.trim() ?? '';
        const [seasonString = '0', episodeString = '0'] = link?.getAttribute('href')?.replace(/#/, '').split('-');
        const resourceEpisodeId = link?.getAttribute('data-id');
        const season = parseInt(seasonString, 10);
        const episode = parseInt(episodeString, 10);
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

  async getDetails(showId: number): Promise<IPageShowInfo> {
    const {
      ororo: showOroro,
      imdb: showImdb,
      ac: showAc,
      ...show
    } = await this.showsRepository.findOne({
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

    return {
      ...show,
      resources: [showOroro && EResource.ORORO, showAc && EResource.AC, showImdb && EResource.IMDB].filter(
        (item) => item,
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      episodes: show.episodes.map(({ ororo, imdb, ac, showId: _showId, ...episode }) => ({
        ...episode,
        resources: [ororo && EResource.ORORO, ac && EResource.AC, imdb && EResource.IMDB].filter((item) => item),
      })),
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

  async updateShowDetails(resource: EResource, id: number, resourceShowId?: string, force = false): Promise<void> {
    const show = await this.showsRepository.findOne({ where: { id } });
    const time = new Date().getTime();

    if (time < show?.sync + DAY && !force && resource && show?.[resource] !== null) {
      this.logger.log('Skipping update.');
      return;
    }

    const resourceId =
      resourceShowId ??
      ((resource === EResource.IMDB && show.imdb) ||
        (resource === EResource.ORORO && show.ororo) ||
        (resource === EResource.AC && show.ac));

    const details = await this.fetchDetails(id, resource, resourceId);

    if (!show) {
      this.showsRepository.insert({
        id,
        title: details.title,
        image: details.image,
        description: details.description,
        year: details.year,
        ororo: details.ororo,
        ac: details.ac,
        imdb: details.imdb,
        sync: time,
        type: details.type,
        ...(details.resource === EResource.IMDB && {
          popularity: details.popularity,
          popularityIncline: details.popularityIncline,
          ratingImdb: details.ratingImdb,
          votedImdb: details.votedImdb,
        }),
        ...(details.resource !== EResource.IMDB && {
          popularity: DEFAULT_POPULARITY,
        }),
      });
    } else {
      this.showsRepository.update(
        {
          id: show.id,
        },
        {
          image: details.image,
          description: details.description,
          sync: time,
          ororo: details.ororo ?? show.ororo,
          ac: details.ac ?? show.ac,
          imdb: details.imdb ?? show.imdb,
          ...(details.resource === EResource.IMDB && {
            popularity: details.popularity,
            popularityIncline: details.popularityIncline,
            ratingImdb: details.ratingImdb,
            votedImdb: details.votedImdb,
          }),
        },
      );
    }

    if (details.type === EShowTypes.MOVIE) {
      const oldEpisode = await this.episodesRepository.findOne({ where: { showId: id } });

      if (!oldEpisode) {
        await this.episodesRepository.insert({
          id,
          showId: id,
          episode: 0,
          season: 0,
          ororo: show.ororo,
          imdb: show.imdb,
          ac: show.ac,
        });
      } else {
        await this.episodesRepository.update(
          { id },
          {
            ororo: details.ororo ?? show.ororo,
            imdb: details.imdb ?? show.imdb,
            ac: details.ac ?? show.ac,
          },
        );
      }

      return;
    }

    if (details.type === EShowTypes.TVSHOW) {
      const oldEpisodes = await this.episodesRepository.find({ where: { showId: id } });
      const newEpisodes = details.episodes.filter(
        (newEpisode) => !oldEpisodes.find((oldEpisode) => oldEpisode.id === newEpisode.id),
      );

      if (newEpisodes.length > 0) {
        await this.episodesRepository.insert(newEpisodes);
      }

      for await (const oldEpisode of oldEpisodes ?? []) {
        const detailsEpisode = details.episodes.find((detailsEpisodeItem) => detailsEpisodeItem.id === oldEpisode.id);
        if (
          detailsEpisode &&
          (detailsEpisode.imdb !== oldEpisode.imdb ||
            detailsEpisode.ac !== oldEpisode.ac ||
            detailsEpisode.ororo !== oldEpisode.ororo ||
            detailsEpisode.release !== oldEpisode.release)
        ) {
          await this.episodesRepository.update(
            {
              id: oldEpisode.id,
            },
            {
              imdb: oldEpisode.imdb ?? detailsEpisode.imdb,
              ac: oldEpisode.ac ?? detailsEpisode.ac,
              ororo: oldEpisode.ororo ?? detailsEpisode.ororo,
              release: (detailsEpisode.release > 0 && detailsEpisode.release) || oldEpisode.release,
            },
          );
        }
      }
    }
  }

  async saveTitle(id: number, title: string): Promise<void> {
    const show = this.showsRepository.findOne({ where: { id } });
    if (!show) {
      throw new Error(`Could not change title. The show with id ${id} is not found.`);
    }

    await this.showsRepository.update({ id }, { title });
  }
}
