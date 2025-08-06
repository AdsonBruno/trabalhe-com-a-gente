import { MissingParamError } from '../errors/MissingParamError';
import { HttpResponse, HttpRequest } from '../protocols/Http';
import { badRequest, ok, serverError } from '../helpers/HttpHelper';
import { Controller } from '../protocols/Controller';
import { RepositoryGit } from '../../domain/interfaces/IRepositoryGit';

export class SearchRepositoryController implements Controller {
  constructor(private readonly repositoryService: RepositoryGit) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.query || !httpRequest.query.query) {
        return badRequest(new MissingParamError('query'));
      }

      const { query, page = '1', per_page = '10' } = httpRequest.query;

      const result = await this.repositoryService.search({
        query: String(query),
        page: parseInt(String(page), 10),
        perPage: parseInt(String(per_page), 10),
      });

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
