import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ShowService } from '../shows/show.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { Episodes } from '../entities/episodes';

@Module({
  imports: [TypeOrmModule.forFeature([Shows, Episodes])],
  controllers: [SearchController],
  providers: [ShowService, SearchService],
})
export class SearchModule {}
