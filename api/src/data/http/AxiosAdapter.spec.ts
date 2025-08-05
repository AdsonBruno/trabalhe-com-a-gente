import { IHttpClient } from '../protocols/http/interfaces/IHttpClient';
import { AxiosAdapter } from './AxiosAdapter';

describe('Axios Adapter', () => {
  let axiosAdapter: IHttpClient;

  beforeEach(() => {
    axiosAdapter = new AxiosAdapter();
  });

  test('should make GET request and return data', async () => {
    const data = await axiosAdapter.get(
      'https://api.github.com/search/repositories'
    );

    expect(data).toBeDefined();
  });
});
