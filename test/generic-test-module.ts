import { ModuleMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeormConnection } from '~/databases/typeorm.connection';
import { EventsModule } from '~/events/events.module';

export const genericTestModule = async ({
  imports,
  controllers,
  providers,
}: ModuleMetadata = {}) => {
  return await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        ...typeormConnection(),
        database: 'rpjooj-backend-test',
        entities: ['src/**/*.entity.ts'],
      } as TypeOrmModuleOptions),
      EventsModule,
      ...imports,
    ],
    controllers,
    providers,
  }).compile();
};
