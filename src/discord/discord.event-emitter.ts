import { Client as DiscordClient, Intents } from 'discord.js';
import { DiscordOptions } from './discord-options.interface';

export class DiscordEventEmitter {
  private client: DiscordClient;

  constructor(private readonly options: DiscordOptions) {
    this.client = new DiscordClient({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
  }
  async init() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });
    await this.client.login(this.options.token);
    this.onMessage();
  }
  onMessage() {
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
      console.log(message.content);
    });
  }
}
