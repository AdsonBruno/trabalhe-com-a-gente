import { SearchRepositoryController } from './SearchRepository';
import {
  SearchParams,
  SearchResult,
  RepositoryGit,
} from '../../domain/interfaces/IRepositoryGit';
import { UnexpectedError } from '../errors/UnexpectedError';
import { HttpRequest } from '../protocols/Http';
import { Validator } from '../protocols/Validator';
import { ValidationError } from '../errors/ValidationError';

class MockRepositoryServiceSpy implements RepositoryGit {
  params?: any;
  result: SearchResult = { totalCount: 1, items: [] };

  async search(params: SearchParams): Promise<SearchResult> {
    this.params = params;

    return this.result;
  }
}

class ValidatorSpy implements Validator {
  input: any;
  error: Error | null = null;
  output: any = {};

  validate(input: any): any {
    this.input = input;

    if (this.error) {
      throw this.error;
    }

    return this.output;
  }
}

const makeSut = () => {
  const repositoryServiceSpy = new MockRepositoryServiceSpy();
  const validatorSpy = new ValidatorSpy();
  const sut = new SearchRepositoryController(
    repositoryServiceSpy,
    validatorSpy
  );

  return { sut, repositoryServiceSpy, validatorSpy };
};

describe('Search Repository Controller', () => {
  test('Should return 400 if validation throws a ValidationError', async () => {
    const { sut, validatorSpy } = makeSut();
    const validationError = new ValidationError('Validation failed');
    validatorSpy.error = validationError;
    const httpRequest: HttpRequest = { query: {} };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.error).toBe(validationError.message);
  });

  test('Should call repository service with correct parameters', async () => {
    const { sut, repositoryServiceSpy, validatorSpy } = makeSut();
    const validatedData = { query: 'validated_query', page: 2, per_page: 20 };
    validatorSpy.output = validatedData;

    const httpRequest = {
      query: {
        query: 'any',
      },
    };
    await sut.handle(httpRequest);

    expect(repositoryServiceSpy.params).toEqual({
      query: validatedData.query,
      page: validatedData.page,
      perPage: validatedData.per_page,
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
