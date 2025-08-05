import axios from 'axios';
import { IHttpClient } from '../protocols/http/interfaces/IHttpClient';

export class AxiosAdapter implements IHttpClient {
  async get(url: string): Promise<any> {
    return {};
  }
}
