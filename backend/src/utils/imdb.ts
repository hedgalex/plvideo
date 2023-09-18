import axios from 'axios';
import parse, { HTMLElement } from 'node-html-parser';
import { EShowTypes } from '~shared/.consts';
import { hash, parseIntOrZero } from './hash';
import { IDetailsEpisode } from '../details/.ifaces/IDetailsEpisode';

interface ImdbOptions {
  parse?: boolean;
}

const DEFAULT_POPULARITY = 9999;

const headers = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  'accept-encoding': '',
};

export const imdb = async (url = '', options: ImdbOptions = { parse: true }): Promise<HTMLElement> => {
  const { data = '' } = await axios(`https://www.imdb.com/${url}`, {
    headers,
  });

  if (options.parse) {
    return parse(data);
  }

  return data;
};

export const retrieveEpisodes = async (showId: number, imdbId: string, years: number[] = []) => {
  const episodes = [] as IDetailsEpisode[];

  for await (const year of years) {
    const episodesData = await imdb(`/title/${imdbId}/episodes/_ajax?year=${year}`);

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
        id: hash(showId, season, episode),
        title: episodeTitle,
        showId,
        episode,
        season,
        imdb: imdbCode,
        release: Number.isNaN(release) ? 0 : release,
      });
    });

    // episodes: episodes.reduce((accumulator, current) => {
    // 	const existingObject = accumulator.find(({ id }) => id === current.id);

    // 	if (!existingObject) {
    // 		accumulator.push(current);
    // 	}

    // 	return accumulator;
    // }, []),
  }
};

export const retrieveShow = async (imdbId: string) => {
  const root = await imdb(`/title/${imdbId}/`);
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

  const show = {
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
  };

  if (type === EShowTypes.TVSHOW) {
    const years = t?.props?.pageProps?.mainColumnData?.episodes?.years?.map(({ year = 1 }) => year) ?? [];
    const episodes = await retrieveEpisodes(show.id, imdbId, years);

    return { ...show, episodes };
  }

  return show;
};
