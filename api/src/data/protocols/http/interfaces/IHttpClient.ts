export interface IHttpRequest {
  url: string;
  params?: any;
}

export interface IHttpResponse {
  statusCode: number;
  body: any;
}

export interface IHttpClient {
  get(data: IHttpRequest): Promise<IHttpResponse>;
}
