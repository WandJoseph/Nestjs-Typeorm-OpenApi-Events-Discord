import { applyDecorators, Post, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  ApiBadRequestException,
  ApiEntityConflictException,
  ApiEntityNotFoundException,
} from '../swagger/api-responses';

export const CreateRoute = (type?: Type<unknown>) =>
  applyDecorators(
    Post(),
    ApiResponse({
      status: 201,
      type,
    }),
    ApiResponse({
      status: 400,
      type: ApiBadRequestException,
    }),
    ApiResponse({
      status: 404,
      type: ApiEntityNotFoundException,
    }),
    ApiResponse({
      status: 409,
      type: ApiEntityConflictException,
    }),
  );
