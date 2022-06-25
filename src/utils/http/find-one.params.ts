import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindOneParams {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id: string;
}
