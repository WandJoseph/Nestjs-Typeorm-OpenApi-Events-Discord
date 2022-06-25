import { applyDecorators, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  ApiEntityNotFoundException,
  ApiEntityConflictException,
  ApiEntityDeletedResponse,
} from '../swagger/api-responses';

export const DeleteRoute = () =>
  applyDecorators(
    Delete(':id'),
    ApiResponse({
      status: 200,
      type: ApiEntityDeletedResponse,
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
