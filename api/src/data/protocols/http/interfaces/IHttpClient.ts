export interface HttpRequest {
  url: string;
  params?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpClient {
  get(data: HttpRequest): Promise<HttpResponse>;
}
