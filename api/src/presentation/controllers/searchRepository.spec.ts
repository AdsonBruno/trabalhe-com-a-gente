import { SearchRepositoryController } from './SearchRepository';
import { MissingParamError } from '../errors/MissingParamError';
import {
  SearchParams,
  SearchResult,
  RepositoryGit,
} from '../../domain/interfaces/IRepositoryGit';
import { UnexpectedError } from '../errors/UnexpectedError';
import { HttpRequest } from '../protocols/Http';

class MockRepositoryServiceSpy implements RepositoryGit {
  params?: any;
  result: SearchResult = { totalCount: 1, items: [] };

  async search(params: SearchParams): Promise<SearchResult> {
    this.params = params;

    return this.result;
  }
}

const makeSut = () => {
  const repositoryServiceSpy = new MockRepositoryServiceSpy();
  const sut = new SearchRepositoryController(repositoryServiceSpy);

  return { sut, repositoryServiceSpy };
};

describe('Search Repository Controller', () => {
  test('Should return 400 if no query is provided', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = { query: {} };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.error).toEqual(
      new MissingParamError('query').message
    );
  });

  test('Should call repository service with correct parameters', async () => {
    const { sut, repositoryServiceSpy } = makeSut();
    const httpRequest = {
      query: {
        query: 'react',
        page: '2',
        per_page: '30',
      },
    };

    await sut.handle(httpRequest);

    expect(repositoryServiceSpy.params).toEqual({
      query: 'react',
      page: 2,
      perPage: 30,
    });
  });

  test('should return status code 500 if repository service throws', async () => {
    const { sut, repositoryServiceSpy } = makeSut();
    jest.spyOn(repositoryServiceSpy, 'search').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = { query: { query: 'any_query' } };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body.error).toEqual(new UnexpectedError().message);
  });
});
