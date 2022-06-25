import { Module } from '@nestjs/common';
import { DatabasesModule } from './databases/databases.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [DatabasesModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
