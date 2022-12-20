import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { ShowTypes } from '../entities/showTypes';
import { SyncService } from './sync.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shows, ShowTypes])],
  providers: [SyncService],
})
export class SyncModule {}
