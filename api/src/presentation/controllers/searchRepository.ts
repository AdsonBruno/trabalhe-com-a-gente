export class SearchRepositoryController {
  handle(httpRequest: any): any {
    return {
      body: new Error('Missing query parameter'),
      statusCode: 400,
    };
  }
}
