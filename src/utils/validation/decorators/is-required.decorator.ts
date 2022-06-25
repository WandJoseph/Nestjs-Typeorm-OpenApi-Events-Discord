import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export const IsRequired = (options?: ApiPropertyOptions) =>
  applyDecorators(IsNotEmpty(), ApiProperty(options));
