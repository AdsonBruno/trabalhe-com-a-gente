import { MissingParamError } from '../errors/missingParamError';
import { HttpResponse, HttpRequest } from '../protocols/http';

export class SearchRepositoryController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.query) {
      return {
        body: new MissingParamError('query parameter'),
        statusCode: 400,
      };
    }
    // Return a default success response (customize as needed)
    return {
      body: { message: 'Query received successfully.' },
      statusCode: 200,
    };
  }
}
