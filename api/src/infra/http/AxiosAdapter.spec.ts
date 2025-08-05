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

  test('should return the correcct status code and body on success', async () => {
    const sut = makeSut();
    const mockedResponse = mockHttpResponse();

    mockAxios.get.mockResolvedValueOnce(mockedResponse);

    const httpResponse = await sut.get({ url: 'https://any_url.com' });

    expect(httpResponse).toEqual({
      statusCode: mockedResponse.status,
      body: mockedResponse.data,
    });
  });

  test('should return the correct status code and body on error', async () => {
    const sut = makeSut();
    const mockedError = {
      response: {
        status: 404,
        data: { error: 'Not Found' },
      },
    };

    mockAxios.get.mockRejectedValueOnce(mockedError);

    const httpResponse = await sut.get({ url: 'https://any_url.com' });

    expect(httpResponse).toEqual({
      statusCode: mockedError.response.status,
      body: mockedError.response.data,
    });
  });

  test('should throw if axios throws an error without response object', async () => {
    const sut = makeSut();
    const mokedError = new Error('Network Error');

    mockAxios.get.mockRejectedValueOnce(mokedError);

    const pormise = sut.get({ url: 'https://any_url.com' });

    await expect(pormise).rejects.toThrow(mokedError);
  });
});
