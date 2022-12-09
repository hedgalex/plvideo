import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {
    config();
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: ['dist/entities/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: ['src/_migration/*.ts'],

      ssl: this.isProduction(),
    };
  }

  public getWatchdogTimeout(): number {
    const time = this.getValue('WATCHDOG_TIMEOUT', false);
    return time ? parseInt(time) : 7200000;
  }

  public getOroroCookies(): string {
    return this.getValue('ORORO_COOKIES', false) ?? '';
  }

  public getAnimecultCookies(): string {
    return this.getValue('ANIME_CULT_COOKIES', false) ?? '';
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
