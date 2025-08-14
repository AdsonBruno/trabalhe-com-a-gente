export interface Owner {
  login: string;
  avatar_url: string;
}

export interface GithubRepositoryItem {
  id: number;
  full_name: string;
  owner: Owner;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export interface GithubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepositoryItem[];
}
