import {
  SearchParams,
  SearchResult,
} from '../../domain/interfaces/IRepositoryGit';
import { UnexpectedError } from '../../presentation/errors/UnexpectedError';
import { CacheClient } from '../../presentation/protocols/cache/CacheClients';
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

class CacheClientSpy implements CacheClient {
  calls = { get: 0, set: 0 };
  key?: string;
  value?: any;
  ttl?: number;
  getData: any = null;

  async set(key: string, value: any, ttl?: number): Promise<void> {
    this.calls.set++;
    this.key = key;
    this.value = value;
    this.ttl = ttl;

    return this.getData;
  }

  async get<T = any>(key: string): Promise<T | null> {
    this.calls.get++;
    this.key = key;

    return this.getData;
  }
}

const makeSut = () => {
  const url = 'https://any-url.com/search/repositories';
  const httpClientSpy = new HttpClientSpy();
  const cacheClientSpy = new CacheClientSpy();
  const sut = new GitRepository(url, httpClientSpy, cacheClientSpy);

  return { sut, httpClientSpy, url, cacheClientSpy };
};

describe('Git Repository Service', () => {
  test('should call CacheClient get with correct key', async () => {
    const { sut, cacheClientSpy } = makeSut();
    const params: SearchParams = {
      query: 'react',
      page: 1,
      perPage: 10,
    };
    await sut.search(params);

    expect(cacheClientSpy.calls.get).toBe(1);
    expect(cacheClientSpy.key).toBe('search:react:1:10');
  });

  test('should return cached data if CacheClient get finds data (cache hit)', async () => {
    const { sut, cacheClientSpy, httpClientSpy } = makeSut();
    const cachedResult: SearchResult = {
      totalCount: 5,
      items: [{ id: 123 }] as any,
    };
    cacheClientSpy.getData = cachedResult;

    const result = await sut.search({ query: 'react', page: 1, perPage: 10 });

    expect(result).toEqual(cachedResult);
    expect(httpClientSpy.url).toBeUndefined();
  });

  test('on cache miss, should call HttpClient with correct params', async () => {
    const { sut, httpClientSpy, url } = makeSut();
    const params: SearchParams = { query: 'react', page: 2, perPage: 20 };

    await sut.search(params);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.params).toEqual({ q: 'react', page: 2, per_page: 20 });
  });

  test('on cache miss should call CacheClient set with correct data', async () => {
    const { sut, cacheClientSpy, httpClientSpy } = makeSut();
    const apiResult = { total_count: 1, items: [{ id: 456 }] as any };
    httpClientSpy.response.body = apiResult;

    await sut.search({ query: 'node', page: 1, perPage: 10 });

    expect(cacheClientSpy.calls.set).toBe(1);
    expect(cacheClientSpy.key).toBe('search:node:1:10');
    expect(cacheClientSpy.value).toEqual(apiResult);
    expect(cacheClientSpy.ttl).toBe(3600);
  });

  test('should throw unexpected error if http client returns an error', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response.statusCode = 500;

    const promise = sut.search({ query: 'any', page: 1, perPage: 10 });

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
