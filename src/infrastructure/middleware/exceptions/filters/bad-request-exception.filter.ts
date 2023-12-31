import { Response as ExpressResponse } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ExceptionResponse } from '../exception-response.interface';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<ExpressResponse>();

    const exceptionResponse: ExceptionResponse =
      exception.getResponse() as ExceptionResponse;
    const errorBody = {
      error: exception.name,
      status: HttpStatus.BAD_REQUEST,
    };

    if (Array.isArray(exceptionResponse.message)) {
      Reflect.set(errorBody, 'messages', exceptionResponse.message);
    } else {
      Reflect.set(errorBody, 'message', exceptionResponse.message);
    }

    return res.status(HttpStatus.BAD_REQUEST).json(errorBody);
  }
}
