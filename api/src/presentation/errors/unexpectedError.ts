export class UnexpectedError extends Error {
  constructor() {
    super('An unexpected error occurred. Please try again later.');
    this.name = 'UnexpectedError';
  }
}
