import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImdbService } from './services/imdb.service';
import { Shows } from '../entities/shows';
import { Episodes } from '../entities/episodes';
import { OroroService } from './services/ororo.service';
import { TorrentService } from './services/torrent.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shows, Episodes])],
  providers: [ImdbService, OroroService, TorrentService],
})
export class SourcesModule {}
