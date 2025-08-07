import {
  SearchParams,
  SearchResult,
  RepositoryGit,
} from '../../domain/interfaces/IRepositoryGit';
import { UnexpectedError } from '../../presentation/errors/UnexpectedError';
import {
  HttpClient,
  HttpResponse,
} from '../protocols/http/interfaces/IHttpClient';
import { CacheClient } from '../../presentation/protocols/cache/CacheClients';

export class GitRepository implements RepositoryGit {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
    private readonly cacheClient: CacheClient
  ) {}

  async search(params: SearchParams): Promise<SearchResult> {
    const cacheKey = `search:${params.query}:${params.page}:${params.perPage}`;

    const cacheData = await this.cacheClient.get<SearchResult>(cacheKey);

    if (cacheData) {
      return cacheData;
    }

    const httpResponse: HttpResponse = await this.httpClient.get({
      url: this.url,
      params: {
        q: params.query,
        page: params.page,
        per_page: params.perPage,
      },
    });

    if (httpResponse.statusCode === 200) {
      const result = httpResponse.body;

      await this.cacheClient.set(cacheKey, result, 3600);

      return result;
    } else {
      throw new UnexpectedError();
    }
  }
}
