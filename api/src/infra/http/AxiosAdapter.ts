import axios from 'axios';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '../../data/protocols/http/interfaces/IHttpClient';

export class AxiosAdapter implements HttpClient {
  async get(data: HttpRequest): Promise<HttpResponse> {
    try {
      const axiosResponse = await axios.get(data.url, { params: data.params });

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    } catch (error: any) {
      if (error.response) {
        return {
          statusCode: error.response.status,
          body: error.response.data,
        };
      }

      throw error;
    }
  }
}
