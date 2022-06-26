import { Global, Module } from '@nestjs/common';
import { DiscordOptions } from './discord-options.interface';
import { DiscordEventEmitter } from './discord.event-emitter';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: DiscordOptions,
      useValue: {
        token: process.env.DISCORD_TOKEN,
        prefix: process.env.DISCORD_PREFIX || '!',
      },
    },
    DiscordEventEmitter,
  ],
  exports: [],
})
export class DiscordModule {}
