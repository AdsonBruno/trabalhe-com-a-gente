import { ISearchParams } from '../../domain/interfaces/IRepositoryGit';
import {
  IHttpClient,
  IHttpResponse,
} from '../protocols/http/interfaces/IHttpClient';
import { GitRepository } from './GitRepository';

class HttpClientSpy implements IHttpClient {
  url?: string;
  params?: any;
  response: IHttpResponse = {
    statusCode: 200,
    body: { totalCount: 1, items: [{ id: 1, name: 'any_name' }] },
  };

  async get(data: { url: string; params?: any }): Promise<IHttpResponse> {
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
    const searchParams: ISearchParams = {
      query: 'react',
      page: 1,
      perPage: 10,
    };
    await sut.search(searchParams);

    expect(httpClientSpy.url).toBe(url);
  });
});
