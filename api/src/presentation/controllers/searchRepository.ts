import { MissingParamError } from '../errors/missingParamError';
import { HttpResponse, HttpRequest } from '../protocols/http';
import { badRequest } from '../helpers/httpHelper';
import { Controller } from '../protocols/controller';
import { RepositoryGit } from '../../domain/interfaces/RepositoryGit';

export class SearchRepositoryController implements Controller {
  constructor(private readonly repositoryService: RepositoryGit) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.query) {
      return badRequest(new MissingParamError('query parameter'));
    }

    const { query, page = '1', per_page = '10' } = httpRequest.body;

    this.repositoryService.search({
      query: String(query),
      page: parseInt(String(page), 10),
      perPage: parseInt(String(per_page), 10),
    });

    return {
      body: { message: 'Query received successfully.' },
      statusCode: 200,
    };
  }
}
