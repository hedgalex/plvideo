import axios from 'axios';
import parse from 'node-html-parser';
import { IImdbSyncData } from './.ifaces/IImdbSyncData';
import { hashShowId } from '../utils/hash';

const toInt = (id: string): number => parseInt(id?.replace(/\D*/g, ''));

const axiosProps = {
  headers: {
    'accept-language': 'en,en-US;q=0.9',
  },
};

const parseData = (data: string, type: number): IImdbSyncData[] => {
  const root = parse(data);

  const name = type === 1 ? 'chart-tvmeter' : 'chart-moviemeter';
  const tvmeter = root.querySelector(`[data-caller-name="${name}"]`);
  const records = tvmeter?.querySelectorAll('tbody tr') ?? [];
  return records.map((record: any, index: number) => {
    const posterColumn = record.querySelector('.posterColumn');
    const posterSmall = posterColumn?.querySelector('img')?.getAttribute('src');

    const imdbRating = parseFloat(posterColumn?.querySelector('span[name=ir]')?.getAttribute('data-value'));
    const imdbVoters = toInt(posterColumn?.querySelector('span[name=nv]')?.getAttribute('data-value'));

    const titleColumn = record.querySelector('.titleColumn');
    const title = titleColumn?.querySelector('a')?.text;
    const year = toInt(titleColumn?.querySelector('.secondaryInfo')?.text ?? '0');

    const velocity = titleColumn.querySelector('.velocity');
    const velocityMeter = velocity?.querySelector('.secondaryInfo');
    const velocityDirection =
      velocityMeter?.querySelector('.titlemeter')?.getAttribute('class')?.indexOf('down') >= 0 ? -1 : 1;

    const velocityValue = velocityDirection * toInt(velocityMeter?.text ?? '0');
    const imdbId = record.querySelector('.watchlistColumn .wlb_ribbon').getAttribute('data-tconst');

    return {
      id: hashShowId(title, year),
      imdbId,
      imagePreview: posterSmall,
      year,
      title,
      type,
      popularity: index + 1,
      popularityIncline: velocityValue,
      ratingImdb: imdbRating,
      votedImdb: imdbVoters,
    };
  });
};

export const getMovies = async () => {
  const { data } = await axios('https://www.imdb.com/chart/moviemeter', axiosProps);

  return parseData(data, 2);
};

export const tvShows = async () => {
  const { data } = await axios('https://www.imdb.com/chart/tvmeter', axiosProps);

  return parseData(data, 1);
};
