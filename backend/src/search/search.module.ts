import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shows } from '~entities/shows';
import { Episodes } from '~entities/episodes';
import { ShowService } from '../shows/show.service';
import { OroroService } from '../sources/services/ororo.service';
import { TorrentService } from '../sources/services/torrent.service';
import { ImdbService } from '../sources/services/imdb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shows, Episodes])],
  controllers: [SearchController],
  providers: [SearchService, ShowService, OroroService, TorrentService, ImdbService],
})
export class SearchModule {}
