import { MissingParamError } from '../errors/missingParamError';
import { HttpResponse, HttpRequest } from '../protocols/http';
import { badRequest } from '../helpers/httpHelper';

export class SearchRepositoryController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.query) {
      return badRequest(new MissingParamError('query parameter'));
    }

    // Return a default success response (customize as needed)
    return {
      body: { message: 'Query received successfully.' },
      statusCode: 200,
    };
  }
}
