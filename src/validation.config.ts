import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const ValidationConfig = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const message: { [key: string]: string[] } = {};
        validationErrors.map((e) => {
          message[e.property] = Object.values(e.constraints);
        });
        return new BadRequestException({
          statusCode: 400,
          message,
          error: 'Bad Request',
        });
      },
    }),
  );
};
