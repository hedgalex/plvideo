import axios from 'axios';
import parse, { HTMLElement } from 'node-html-parser';
import { Injectable } from '@nestjs/common';
import { getTorrentInfo } from 'plvideo-torrent';
import { hash } from '~server/utils/hash';
import { Episodes } from '~entities/episodes';
import { Shows } from '~entities/shows';
import { defaultHeaders } from '~server/common/.consts';
import { Headers } from '~server/common/.ifaces';
import { getTorrentSearchText } from '~server/utils/searchText';
import { SourceContentItem } from '~shared/.ifaces';

@Injectable()
export class TorrentService {
  headers: Headers;
  path: string;

  constructor() {
    this.headers = { ...defaultHeaders };
    this.path = './temp';
  }

  private async callTorrent(url = ''): Promise<string> {
    const { data = '' } = await axios(`https://torrentz2.nz${url}`, {
      headers: this.headers,
    });

    return data;
  }

  private async callTorrentAndParse(url = ''): Promise<HTMLElement> {
    const data = await this.callTorrent(url);
    return parse(data ?? '');
  }

  private async searchTorrent(text: string, { filterUserView = false }): Promise<any[]> {
    const doc = await this.callTorrentAndParse(`/search?q=${encodeURIComponent(text)}`);
    const resultItems = doc.querySelectorAll('.results dl');

    const items =
      resultItems?.map((item) => {
        const name = item.querySelector('dt a')?.text;
        const magnet = item.querySelector('dd span:nth-child(1) a')?.getAttribute('href');
        const size = item.querySelector('dd span:nth-child(3)')?.text?.replace(/\s/g, '') ?? '';
        const seeds = item.querySelector('dd span:nth-child(4)')?.text ?? '';
        const peers = item.querySelector('dd span:nth-child(5)')?.text ?? '';

        if (filterUserView) {
          return {
            id: hash(magnet),
            name,
            seeds,
            peers,
            size,
          };
        }

        return {
          id: hash(magnet),
          name,
          seeds,
          peers,
          size,
          magnet,
        };
      }) ?? [];

    return items;
  }

  public async getShows(show: Shows, { filterUserView = false }): Promise<SourceContentItem[]> {
    return this.searchTorrent(show.title, { filterUserView });
  }

  public async getEpisode(show: Shows, episode: Episodes, { filterUserView = false }): Promise<SourceContentItem[]> {
    const text = `${show.title}${getTorrentSearchText(episode.season, episode.episode)}}`;
    return this.searchTorrent(text, { filterUserView });
  }

  public async getSourceDetails(magnet: string): Promise<SourceContentItem[]> {
    const items = await getTorrentInfo(magnet, this.path);

    return items;
  }
}
