import { Global, Module, ConsoleLogger } from '@nestjs/common';
import { DiscordOptions } from './discord-options';
import { DiscordEventEmitter } from './discord.event-emitter';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    ConsoleLogger,
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
