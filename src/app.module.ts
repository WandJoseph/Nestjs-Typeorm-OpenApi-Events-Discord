import { Module } from '@nestjs/common';
import { DatabasesModule } from './databases/databases.module';
import { DiscordModule } from './discord/discord.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabasesModule, EventsModule, DiscordModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
