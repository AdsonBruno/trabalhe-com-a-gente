import { SearchRepositoryController } from './searchRepository';
import { MissingParamError } from '../errors/missingParamError';

const mockRepositoryService = {
  search: jest.fn(),
};

const makeSut = (): SearchRepositoryController => {
  return new SearchRepositoryController(mockRepositoryService);
};

describe('Search Repository Controller', () => {
  test('Should return 400 if no query is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {},
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('query parameter'));
  });

  test('Should call repository service with correct parameters', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        query: 'react',
        page: '2',
        per_page: '30',
      },
    };

    sut.handle(httpRequest);

    expect(mockRepositoryService.search).toHaveBeenCalledWith({
      query: 'react',
      page: 2,
      perPage: 30,
    });
  });
});
