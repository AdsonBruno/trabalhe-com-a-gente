export interface RepositoryGit {
  search(params: { query: string; page: number; perPage: number }): any;
}
