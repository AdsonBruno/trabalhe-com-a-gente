import { SearchRepositoryController } from './searchRepository';

describe('Search Repository Controller', () => {
  test('Should return 400 if no query is provided', () => {
    const sut = new SearchRepositoryController();
    const httpRequest = {
      body: {},
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
