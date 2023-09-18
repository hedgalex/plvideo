import axios from 'axios';
import parse, { HTMLElement } from 'node-html-parser';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, parseIntOrZero } from '../../utils/hash';
import { EShowTypes } from '~shared/.consts';
import { Episodes } from '../../entities/episodes';
import { Shows } from '../../entities/shows';
import { Repository } from 'typeorm';

const DEFAULT_POPULARITY = 9999;

@Injectable()
export class ImdbService {
  imdbHeaders: { 'user-agent': string; 'accept-encoding': string };

  constructor(
    @InjectRepository(Shows) private showRepository: Repository<Shows>,
    @InjectRepository(Episodes) private episodeRepository: Repository<Episodes>,
  ) {
    this.imdbHeaders = {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      'accept-encoding': '',
    };
  }

  private async callIMDb(url = ''): Promise<string> {
    const { data = '' } = await axios(`https://www.imdb.com/${url}`, {
      headers: this.imdbHeaders,
    });

    return data;
  }

  private async callIMDbAndParse(url = ''): Promise<HTMLElement> {
    const data = await this.callIMDb(url);
    return parse(data ?? '');
  }

  public async getShow(imdbId: string): Promise<Shows> {
    const root = await this.callIMDbAndParse(`/title/${imdbId}/`);
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
    const rankChange = showData.meterRanking?.rankChange;
    const rankIncline = rankChange?.difference * (rankChange?.changeDirection === 'DOWN' ? -1 : 1);

    return this.showRepository.create({
      id: hash(title, year),
      title,
      image,
      imdb: imdbId,
      type,
      description,
      year,
      popularity: currentRank > DEFAULT_POPULARITY ? DEFAULT_POPULARITY : currentRank,
      popularityIncline: rankIncline,
      votedImdb,
      ratingImdb,
    });
  }

  public async getEpisodes(showId: number, imdbId: string): Promise<Episodes[]> {
    const episodes = [] as Episodes[];
    const root = await this.callIMDbAndParse(`/title/${imdbId}/`);
    const t = JSON.parse(root.querySelector('#__NEXT_DATA__')?.text ?? '{}');
    const years = t?.props?.pageProps?.mainColumnData?.episodes?.years?.map(({ year = 1 }) => year) ?? [];

    for await (const year of years) {
      const episodesData = await this.callIMDbAndParse(`/title/${imdbId}/episodes/_ajax?year=${year}`);

      episodesData.querySelectorAll('div.list_item')?.forEach((episodeItem) => {
        const link = episodeItem.querySelector('.image a');
        const episodeTitle = link.getAttribute('title');
        const divElement = link.querySelector('div');
        const [, seasonNumber, episodeNumber] = divElement.querySelector('div')?.text?.match(/S(\d+),\sEp(\d+)/);
        const season = parseIntOrZero(seasonNumber);
        const episode = parseIntOrZero(episodeNumber);
        const releaseTime = episodeItem.querySelector('.airdate')?.text ?? '';
        const release = releaseTime ? new Date(releaseTime).getTime() : 0;

        episodes.push(
          this.episodeRepository.create({
            id: hash(showId, season, episode),
            title: episodeTitle,
            showId,
            season,
            episode,
            release: Number.isNaN(release) ? 0 : release,
          }),
        );
      });
    }

    return episodes;
  }
}
