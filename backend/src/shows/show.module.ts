import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { Episodes } from '../entities/episodes';
import { ShowsController } from './show.controller';
import { ShowService } from './show.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shows, Episodes])],
  controllers: [ShowsController],
  providers: [ShowService],
})
export class ShowsModule {}
