import { ApiProperty } from '@nestjs/swagger';

export class ApiEntityNotFoundException {
  @ApiProperty({ default: 404 })
  statusCode: number;
  @ApiProperty({ default: 'Entity not found.' })
  message: string;
}

export class ApiBadRequestException {
  @ApiProperty({ default: 400 })
  statusCode: number;
  @ApiProperty()
  message: {
    [key: string]: string[];
  };
  @ApiProperty({ default: 'Bad Request' })
  error: string;
}

export class ApiEntityConflictException {
  @ApiProperty({ default: 409 })
  statusCode: number;
  @ApiProperty({ default: 'Entity already exists.' })
  message: string;
}

export class ApiEntityDeletedResponse {
  @ApiProperty({
    default: 'Successfully deleted Entity entity.',
    examples: [
      "Successfully deleted 'id?' entity.",
      'Successfully deleted Entity entity.',
    ],
  })
  public message:
    | `Successfully deleted '${string}' ${string} entity.`
    | `Successfully deleted ${string} entities.`
    | `Successfully updated ${string} entity.`;
  @ApiProperty()
  public affected: number;
}

export class ApiEntityUpdatedResponse {
  @ApiProperty({
    default: 'Successfully updated Entity entity.',
    examples: [
      "Successfully updated 'id?' entity.",
      'Successfully updated Entity entity.',
    ],
  })
  public message:
    | `Successfully updated '${string}' ${string} entity.`
    | `Successfully updated ${string} entities.`
    | `Successfully updated ${string} entity.`;
  @ApiProperty()
  public affected: number;
}
