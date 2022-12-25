import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shows } from '~server/entities/shows';
import { getMovies, tvShows as getTVShows } from './utils';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    @InjectRepository(Shows)
    private showsRepository: Repository<Shows>,
  ) {}

  private async addTopsToDatabase(shows, type: number) {
    for await (const show of shows) {
      const existTvShow = await this.showsRepository.findOne({
        where: { id: show.id },
      });

      if (existTvShow) {
        await this.showsRepository.update(
          { id: existTvShow.id },
          {
            popularity: show.popularity,
            popularityIncline: show.popularityIncline,
            ratingImdb: show.ratingImdb,
            votedImdb: show.votedImdb,
          },
        );
      } else {
        await this.showsRepository.insert({
          id: show.id,
          image: show.imagePreview,
          year: show.year,
          title: show.title,
          type,
          popularity: show.popularity,
          popularityIncline: show.popularityIncline,
          ratingImdb: show.ratingImdb,
          votedImdb: show.votedImdb,
        });
      }
    }
  }

  @Cron('0 0 0 * * *')
  async syncImdbData() {
    const tvshows = await getTVShows();

    if (!tvshows || tvshows.length === 0) {
      this.logger.warn('Error loading tvshows top list');
      return;
    }

    await this.addTopsToDatabase(tvshows, 1);

    this.logger.log('Updated TV Shows top list');

    const movies = await getMovies();

    if (!movies || movies.length === 0) {
      this.logger.warn('Error loading movies top list');
      return;
    }

    await this.addTopsToDatabase(movies, 2);
    this.logger.log('Updated Movies top list');
  }
}
