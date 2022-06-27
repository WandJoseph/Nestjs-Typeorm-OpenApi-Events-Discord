import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client as DiscordClient, Intents, Message } from 'discord.js';
import {
  EntityConflictException,
  EntityNotFoundException,
} from '~/utils/default-exceptions';
import { DiscordCommandMetadataHandler } from './decorators/command.decorator';
import {
  getGroupOptions,
  getTargetGroups,
  GroupOptions,
} from './decorators/group.decorator';
import { DiscordOptions } from './discord-options.interface';

class GroupContext {
  public readonly options: GroupOptions;
  constructor(private readonly handler: DiscordCommandMetadataHandler) {
    this.options = getGroupOptions(this.handler.target);
  }

  get name() {
    return this.options.name;
  }
  get methods() {
    return this.handler.getMethodKeys();
  }

  async execute(message: Message<boolean>) {
    if (!message.content.startsWith(this.name + ' ')) {
      return;
    }
    message.content = message.content.slice(this.name.length + 1);
    for (const method of this.methods) {
      const options = this.handler.getCommandOptions(method);
      const commands = [...(options.aliases || []), options.name];
      for (const command of commands) {
        if (message.content.startsWith(command)) {
          message.content = message.content.slice(command.length + 1);
          return await this.handler.target[method](message);
        }
      }
    }
  }
}
@Injectable()
export class DiscordEventEmitter implements OnModuleInit {
  private client: DiscordClient;

  constructor(private readonly options: DiscordOptions) {
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
    this.onMessage();
  }

  onMessage() {
    const targets = getTargetGroups();
    const handlers = targets.map(
      (target) => new DiscordCommandMetadataHandler(target),
    );
    const groups = handlers.map((handler) => new GroupContext(handler));

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
      try {
        for (const group of groups) {
          await group.execute(message);
        }
      } catch (error) {
        await this.handleErrors(error, message);
      }
    });
  }

  async handleErrors(err: Error, message: Message<boolean>) {
    if (err instanceof EntityNotFoundException) {
      await message.channel.send(err.message);
    }
    if (err instanceof EntityConflictException) {
      await message.channel.send(err.message);
    }
    return err;
  }
}
