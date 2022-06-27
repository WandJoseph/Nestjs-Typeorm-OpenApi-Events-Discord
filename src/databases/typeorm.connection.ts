import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConnection = (): TypeOrmModuleOptions =>
  ({
    type: process.env.DB_DRIVE || 'postgres',
    database: process.env.DB_DATABASE || 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
  } as TypeOrmModuleOptions);
