export interface IHttpClient {
  get(url: string, config?: any): Promise<any>;
}
