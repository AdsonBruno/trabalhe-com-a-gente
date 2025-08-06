export interface Owner {
  id: number;
  login: string;
  avatarUrl: string;
}

export interface RepositoryModel {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  owner: Owner;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  openIssuesCount: number;
}

export interface SearchResult {
  totalCount: number;
  items: RepositoryModel[];
}

export interface SearchParams {
  query: string;
  page: number;
  perPage: number;
}

export interface RepositoryGit {
  search(params: SearchParams): Promise<SearchResult>;
}
