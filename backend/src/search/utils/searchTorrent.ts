import axios from 'axios';
import parse from 'node-html-parser';
import { ISearchOptions } from '../.ifaces/ISearchOptions';
import { hashCode } from '../../utils/hash';
import { ISourceItem } from '~shared/.ifaces';

export const getCode = (season: number, episode: number): string => {
  const seasonString = season ? season?.toString().padStart(2, '0') : '';
  const episodeString = episode ? episode?.toString().padStart(2, '0') : '';

  if (seasonString && episodeString) {
    return ` S${seasonString}E${episodeString}`;
  }

  if (seasonString) {
    return ` Season ${seasonString}`;
  }

  return '';
};

export const searchShowInTorrent = async (
  title: string,
  { season, episode, filterUserView }: ISearchOptions = {},
): Promise<ISourceItem[]> => {
  const query = `${title}${getCode(season, episode)}}`;
  const response = await axios.get(`https://torrentz2.nz/search?q=${encodeURIComponent(query)}`);

  const root = parse(response?.data ?? '');
  const resultItems = root.querySelectorAll('.results dl');

  const items =
    resultItems?.map((item) => {
      const name = item.querySelector('dt a')?.text;
      const magnet = item.querySelector('dd span:nth-child(1) a')?.getAttribute('href');
      const size = item.querySelector('dd span:nth-child(3)')?.text?.replace(/\s/g, '') ?? '';
      const seeds = item.querySelector('dd span:nth-child(4)')?.text ?? '';
      const peers = item.querySelector('dd span:nth-child(5)')?.text ?? '';

      if (filterUserView) {
        return {
          id: hashCode(magnet),
          name,
          seeds,
          peers,
          size,
        };
      }

      return {
        id: hashCode(magnet),
        name,
        seeds,
        peers,
        size,
        magnet,
      };
    }) ?? [];

  return items;
};
