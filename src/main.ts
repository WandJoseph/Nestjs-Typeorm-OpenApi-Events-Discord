import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DiscordConfig } from './discord.config';
import { SwaggerConfig } from './swagger.config';
import { ValidationConfig } from './validation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  ValidationConfig(app);
  SwaggerConfig(app);
  DiscordConfig();

  await app.listen(8000);
}
bootstrap();
