import { MissingParamError } from '../errors/missingParamError';
import { HttpResponse, HttpRequest } from '../protocols/http';
import { badRequest, ok, serverError } from '../helpers/httpHelper';
import { Controller } from '../protocols/controller';
import { RepositoryGit } from '../../domain/interfaces/IRepositoryGit';

export class SearchRepositoryController implements Controller {
  constructor(private readonly repositoryService: RepositoryGit) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.query) {
        return badRequest(new MissingParamError('query'));
      }

      const { query, page = '1', per_page = '10' } = httpRequest.body;

      const result = await this.repositoryService.search({
        query: String(query),
        page: parseInt(String(page), 10),
        perPage: parseInt(String(per_page), 10),
      });

      return ok(result);
      // return {
      //   body: { message: 'Query received successfully.' },
      //   statusCode: 200,
      // };}
    } catch (error) {
      return serverError(error);
    }
  }
}
