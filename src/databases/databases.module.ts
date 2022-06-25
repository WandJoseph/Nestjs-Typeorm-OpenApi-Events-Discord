import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnection } from './typeorm.connection';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(typeormConnection())],
})
export class DatabasesModule {}
