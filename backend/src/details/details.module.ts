import { Module } from '@nestjs/common';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { Episodes } from '../entities/episodes';
import { ShowService } from '../shows/show.service';
import { ImdbService } from '../sources/services/imdb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shows, Episodes])],
  controllers: [DetailsController],
  providers: [DetailsService, ShowService, ImdbService],
})
export class DetailsModule {}
