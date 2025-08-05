export interface IOwner {
  id: number;
  login: string;
  avatarUrl: string;
}

export interface IRepositoryModel {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  owner: IOwner;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  openIssuesCount: number;
}

export interface ISearchResult {
  totalCount: number;
  items: IRepositoryModel[];
}

export interface ISearchParams {
  query: string;
  page: number;
  perPage: number;
}

export interface RepositoryGit {
  search(params: ISearchParams): Promise<ISearchResult>;
}
