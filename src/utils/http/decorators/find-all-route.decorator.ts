import { applyDecorators, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  ApiBadRequestException,
  ApiEntityNotFoundException,
} from '../swagger/api-responses';

export const FindAllRoute = () =>
  applyDecorators(
    Get(),
    ApiResponse({
      status: 200,
      description: `Tuple[Entity[], number]`,
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
