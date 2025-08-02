import { HttpResponse, HttpRequest } from '../protocols/http';

export class SearchRepositoryController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.query) {
      return {
        body: new Error('Missing query parameter'),
        statusCode: 400,
      };
    }
  }
}
