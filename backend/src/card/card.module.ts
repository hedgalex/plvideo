import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { Episodes } from '../entities/episodes';
import { SearchService } from '../search/search.service';
import { ShowService } from '../shows/show.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shows, Episodes])],
  controllers: [CardController],
  providers: [SearchService, ShowService],
})
export class CardModule {}
