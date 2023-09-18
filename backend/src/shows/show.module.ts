import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { Episodes } from '../entities/episodes';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { ImdbService } from '../sources/services/imdb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shows, Episodes])],
  controllers: [ShowController],
  providers: [ShowService, ImdbService],
})
export class ShowsModule {}
