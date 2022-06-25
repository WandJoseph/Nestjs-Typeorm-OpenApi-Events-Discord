import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import {
  EntityConflictException,
  EntityNotFoundException,
} from '~/utils/default-exceptions';

@Injectable()
export class HttpExceptionHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof EntityNotFoundException) {
          throw new NotFoundException(err.message);
        }
        if (err instanceof EntityConflictException) {
          throw new ConflictException(err.message);
        }
        return err;
      }),
    );
  }
}
