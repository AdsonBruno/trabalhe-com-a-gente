export class SearchRepositoryController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.query) {
      return {
        body: new Error('Missing query parameter'),
        statusCode: 400,
      };
    }
  }
}
