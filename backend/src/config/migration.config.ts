import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from './config.service';

const datasource = new DataSource(configService.getTypeOrmConfig() as DataSourceOptions); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;
