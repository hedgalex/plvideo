import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shows } from '~entities/shows';
import { Episodes } from '~entities/episodes';
import { SearchService } from '../search/search.service';
import { ShowService } from '../shows/show.service';
import { ImdbService } from '../sources/services/imdb.service';
import { OroroService } from '../sources/services/ororo.service';
import { TorrentService } from '../sources/services/torrent.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shows, Episodes])],
  controllers: [CardController],
  providers: [SearchService, OroroService, TorrentService, ShowService, ImdbService],
})
export class CardModule {}
