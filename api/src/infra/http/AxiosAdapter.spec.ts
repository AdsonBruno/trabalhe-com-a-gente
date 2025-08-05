import { AxiosAdapter } from '../http/AxiosAdapter';
import { IHttpRequest } from '../../data/protocols/http/interfaces/IHttpClient';
import axios from 'axios';

const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock('axios');

const mockHttpResponse = (): any => ({
  data: { any_field: 'any_value' },
  status: 200,
});

mockAxios.get.mockResolvedValue(mockHttpResponse());

const makeSut = (): AxiosAdapter => {
  return new AxiosAdapter();
};

describe('Axios Adapter', () => {
  beforeEach(() => {
    mockAxios.get.mockResolvedValue(mockHttpResponse());
  });

  test('should call axios.get with correct URL and params', async () => {
    const sut = makeSut();
    const request: IHttpRequest = {
      url: 'https://any_url.com',
      params: {
        any_param: 'any_value',
      },
    };

    await sut.get(request);

    expect(mockAxios.get).toHaveBeenCalledWith(request.url, {
      params: request.params,
    });
  });
});
