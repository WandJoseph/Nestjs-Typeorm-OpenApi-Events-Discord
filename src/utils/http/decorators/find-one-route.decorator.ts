import { applyDecorators, Get, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  ApiEntityNotFoundException,
  ApiBadRequestException,
} from '../swagger/api-responses';

export const FindOneRoute = (type?: Type<unknown>) =>
  applyDecorators(
    Get(':id'),
    ApiResponse({
      status: 200,
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
  );
