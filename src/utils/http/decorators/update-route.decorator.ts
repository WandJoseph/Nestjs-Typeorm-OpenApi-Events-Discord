import { applyDecorators, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  ApiEntityUpdatedResponse,
  ApiEntityNotFoundException,
  ApiEntityConflictException,
} from '../swagger/api-responses';

export const UpdateRoute = () =>
  applyDecorators(
    Patch(':id'),
    ApiResponse({
      status: 200,
      type: ApiEntityUpdatedResponse,
    }),
    ApiResponse({
      status: 400,
      type: ApiEntityNotFoundException,
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
