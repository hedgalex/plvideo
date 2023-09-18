import axios from 'axios';
import parse from 'node-html-parser';
import { ISearchOptions } from '../.ifaces/ISearchOptions';
import { EShowTypes } from '~shared/.consts';
import { hash } from '../../utils/hash';
import { ISourceItem } from '../../shared/.ifaces';

const MOVIE = 'Movie';
const SHOW = 'TV Show';

const SHOW_TYPES = {
  [MOVIE]: EShowTypes.MOVIE,
  [SHOW]: EShowTypes.TVSHOW,
};

const findShowInOroro = async (title: string, options: ISearchOptions): Promise<ISourceItem[]> => {
  if (!options.headers?.Cookie) {
    return [];
  }

  const response = await axios(`https://ororo.tv/en/api/frontend/search?query=${title}`, {
    headers: options.headers,
  });

  const root = parse(response?.data ?? '');
  const items = root.querySelectorAll('.search-results-item')?.reduce((accumulator, item) => {
    const type = SHOW_TYPES[item.querySelector('p:nth-child(2)')?.text?.match(/Movie|TV Show/i)?.[0] ?? ''];
    if (!type) {
      return accumulator;
    }

    const ororoId = item.getAttribute('href');
    const name = item.querySelector('p:nth-child(1)')?.text ?? '';
    const year = Number.parseInt(item.querySelector('p:nth-child(2)')?.text?.match(/\d{4}/)?.[0] ?? '0', 10);

    if (year === options.year && type === options.type && name === title) {
      if (options.filterUserView) {
        accumulator.push({
          id: hash(ororoId),
          name,
        });
      } else {
        accumulator.push({
          id: hash(ororoId),
          sourceId: ororoId,
          name,
        });
      }
    }

    return accumulator;
  }, []);

  return items;
};

export const searchShowInOroro = async (title: string, options: ISearchOptions): Promise<ISourceItem[]> => {
  if (!options.headers?.Cookie) {
    return [];
  }

  const items = await findShowInOroro(title, { ...options, filterUserView: false });

  if (!items?.length) {
    return [];
  }

  const [item] = items;

  if (options.type === EShowTypes.MOVIE) {
    if (options.filterUserView) {
      return [
        {
          id: item.id,
          name: item.name,
        },
      ];
    } else {
      return items;
    }
  }

  const sourceId = item.sourceId;
  const response = await axios(`https://ororo.tv/en${sourceId}`, { headers: options.headers });
  const root = parse(response?.data ?? '');

  if (options.episode) {
    const episode = root.querySelector(`.show-content__episode-link[href='#${options.season}-${options.episode}']`);

    if (!episode) {
      return [];
    }

    const episodeSourceId = episode.getAttribute('data-id');
    const episodeName = episode.text?.trim();

    if (options.filterUserView) {
      return [
        {
          id: hash(episodeSourceId),
          name: episodeName,
        },
      ];
    }

    return [
      {
        id: hash(episodeSourceId),
        name: episodeName,
        sourceId: episodeSourceId,
      },
    ];
  }

  return [];
};
