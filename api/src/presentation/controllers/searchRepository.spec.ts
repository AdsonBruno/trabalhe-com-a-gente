import { SearchRepositoryController } from './searchRepository';
import { MissingParamError } from '../errors/missingParamError';
import {
  ISearchParams,
  ISearchResult,
  RepositoryGit,
} from '../../domain/interfaces/IRepositoryGit';
import { UnexpectedError } from '../errors/unexpectedError';
import { HttpRequest } from '../protocols/http';

class MockRepositoryServiceSpy implements RepositoryGit {
  params?: any;
  result: ISearchResult = { totalCount: 1, items: [] };

  async search(params: ISearchParams): Promise<ISearchResult> {
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
    expect(httpResponse.body).toEqual(new MissingParamError('query'));
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
