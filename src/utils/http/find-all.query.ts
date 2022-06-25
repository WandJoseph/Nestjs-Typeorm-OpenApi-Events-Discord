import { IsNumber, Max } from 'class-validator';
import { IsNotRequired } from '../validation/decorators/is-not-required.decorator';

export class FindAllQuery {
  @IsNotRequired()
  @IsNumber()
  @Max(100)
  take?: number;
  @IsNumber()
  @IsNotRequired()
  skip?: number;
}
