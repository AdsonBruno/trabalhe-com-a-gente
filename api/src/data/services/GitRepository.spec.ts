import {
  SearchParams,
  SearchResult,
} from '../../domain/interfaces/IRepositoryGit';
import { UnexpectedError } from '../../presentation/errors/UnexpectedError';
import {
  HttpClient,
  HttpResponse,
} from '../protocols/http/interfaces/IHttpClient';
import { GitRepository } from './GitRepository';

class HttpClientSpy implements HttpClient {
  url?: string;
  params?: any;
  response: HttpResponse = {
    statusCode: 200,
    body: { totalCount: 1, items: [{ id: 1, name: 'any_name' }] },
  };

  async get(data: { url: string; params?: any }): Promise<HttpResponse> {
    this.url = data.url;
    this.params = data.params;

    return this.response;
  }
}

const makeSut = () => {
  const url = 'https://any-url.com/search/repositories';
  const httpClientSpy = new HttpClientSpy();
  const sut = new GitRepository(url, httpClientSpy);

  return { sut, httpClientSpy, url };
};

describe('Git Repository Service', () => {
  test('should call HttpClient with correct URL and params', async () => {
    const { sut, httpClientSpy, url } = makeSut();
    const searchParams: SearchParams = {
      query: 'react',
      page: 1,
      perPage: 10,
    };
    await sut.search(searchParams);

    expect(httpClientSpy.url).toBe(url);
  });

  test('should return a list of repositories on success and status code 200', async () => {
    const { sut, httpClientSpy } = makeSut();

    const mockResult: SearchResult = {
      totalCount: 1,
      items: [
        {
          id: '1',
          name: 'any_name',
          fullName: 'any_full_name',
          url: 'https://any-url.com/repo',
          description: 'any_description',
          stargazersCount: 100,
          watchersCount: 50,
          forksCount: 10,
          openIssuesCount: 5,
          owner: {
            id: 1,
            login: 'any_login',
            avatarUrl: 'https://any-url.com/avatar.png',
          },
        },
      ],
    };

    httpClientSpy.response.body = mockResult;

    const result = await sut.search({ query: 'any', page: 1, perPage: 10 });

    expect(result).toEqual(mockResult);
  });

  test('should throw unexpected error if http client returns an error', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response.statusCode = 500;

    const promise = sut.search({ query: 'any', page: 1, perPage: 10 });

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
