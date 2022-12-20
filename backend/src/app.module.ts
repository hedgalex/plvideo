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

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SyncModule,
    TasksModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
    }),
    SearchModule,
    DetailsModule,
  ],
})
export class AppModule {}
