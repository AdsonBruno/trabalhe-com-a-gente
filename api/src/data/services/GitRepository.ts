import {
  ISearchParams,
  ISearchResult,
  RepositoryGit,
} from '../../domain/interfaces/IRepositoryGit';
import { UnexpectedError } from '../../presentation/errors/unexpectedError';
import {
  IHttpClient,
  IHttpResponse,
} from '../protocols/http/interfaces/IHttpClient';

export class GitRepository implements RepositoryGit {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  async search(params: ISearchParams): Promise<ISearchResult> {
    const httpResponse: IHttpResponse = await this.httpClient.get({
      url: this.url,
      params: {
        q: params.query,
        page: params.page,
        per_page: params.perPage,
      },
    });

    if (httpResponse.statusCode === 200) {
      return httpResponse.body;
    } else {
      throw new UnexpectedError();
    }
  }
}
