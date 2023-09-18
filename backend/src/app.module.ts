import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { configService } from './config/config.service';
import { TasksModule } from './tasks/tasks.module';
import { SearchModule } from './search/search.module';
import { SyncModule } from './sync/sync.module';
import { DetailsModule } from './details/details.module';
import { ShowsModule } from './shows/show.module';
import { CardModule } from './card/card.module';
import { SourcesModule } from './sources/sources.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SourcesModule,
    SyncModule,
    TasksModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig(true)),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
    }),
    SearchModule,
    DetailsModule,
    CardModule,
    ShowsModule,
  ],
})
export class AppModule {}
