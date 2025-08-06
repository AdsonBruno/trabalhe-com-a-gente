import { UnexpectedError } from '../errors/UnexpectedError';
import { HttpResponse } from '../protocols/Http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: { error: error.message },
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: { error: new UnexpectedError().message },
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});
