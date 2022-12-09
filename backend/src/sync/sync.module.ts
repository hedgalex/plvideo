import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shows } from '../entities/shows.entity';
import { ShowTypes } from '../entities/showTypes.entity';
import { SyncService } from './sync.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shows, ShowTypes])],
  providers: [SyncService],
})
export class SyncModule {}
