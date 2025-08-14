import { HttpResponse, HttpRequest } from '../protocols/Http';
import { badRequest, ok, serverError } from '../helpers/HttpHelper';
import { Controller } from '../protocols/Controller';
import { RepositoryGit } from '../../domain/interfaces/IRepositoryGit';
import { Validator } from '../protocols/Validator';
import { ValidationError } from '../errors/ValidationError';

export class SearchRepositoryController implements Controller {
  constructor(
    private readonly repositoryService: RepositoryGit,
    private readonly validator: Validator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validateQuery = this.validator.validate(httpRequest.query);

      const result = await this.repositoryService.search({
        query: validateQuery.query,
        page: validateQuery.page,
        perPage: validateQuery.per_page,
      });

      return ok(result);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }
      return serverError(error as Error);
    }
  }
}
