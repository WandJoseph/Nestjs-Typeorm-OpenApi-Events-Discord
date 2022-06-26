import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Client as DiscordClient, Intents, Message } from 'discord.js';
import { GroupOptions } from 'typeorm';
import { AppEventEmitter } from '~/events/app.event-emitter';
import { DiscordOptions } from './discord-options.interface';

@Injectable()
export class DiscordEventEmitter implements OnModuleInit {
  private client: DiscordClient;

  constructor(
    @Inject(EventEmitter2)
    private readonly eventEmitter: AppEventEmitter,
    private readonly options: DiscordOptions,
    private reflector: Reflector,
  ) {
    this.client = new DiscordClient({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
  }
  onModuleInit() {
    this.init();
  }
  async init() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });
    await this.client.login(this.options.token);
    this.messageSetUp();
  }

  messageSetUp() {
    this.client.on('messageCreate', async (message) => {
      // IF IS A BOT
      if (message.author.bot) return;
      // IF IS NOT FROM A GUILD
      if (!message.guild) return;
      // IF NOT STARTS WITH PREFIX
      const prefix = this.options.prefix;
      if (!message.content.startsWith(prefix)) return;
      // REMOVE PREFIX FROM CONTENT
      message.content = message.content.slice(prefix.length);

      this.onMessage(message);
    });
  }
  onMessage(message?: Message<boolean>) {}
}
