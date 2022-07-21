import { MessageOptions } from 'discord.js';

export interface HasDiscordPayload {
  toPayload(): MessageOptions;
}
