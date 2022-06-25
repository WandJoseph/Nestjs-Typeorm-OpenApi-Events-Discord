import { DiscordEventEmitter } from './discord/discord.event-emitter';

class MissingDiscordTokenError extends Error {
  constructor() {
    super('Missing Discord token');
  }
}

export const DiscordConfig = async () => {
  if (!process.env.DISCORD_TOKEN) {
    throw new MissingDiscordTokenError();
  }
  const discord = new DiscordEventEmitter({
    token: process.env.DISCORD_TOKEN,
    prefix: process.env.DISCORD_PREFIX || '!',
  });
  await discord.init();
};
