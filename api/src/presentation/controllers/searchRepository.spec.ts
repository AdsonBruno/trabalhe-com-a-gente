import { SearchRepositoryController } from './searchRepository';
import { MissingParamError } from '../errors/missingParamError';

const makeSut = (): SearchRepositoryController => {
  return new SearchRepositoryController();
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
});
