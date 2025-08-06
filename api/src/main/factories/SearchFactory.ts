import { SearchRepositoryController } from '../../presentation/controllers/SearchRepository';
import { GitRepository } from '../../data/services/GitRepository';
import { AxiosAdapter } from '../../infra/http/AxiosAdapter';
import { Controller } from '../../presentation/protocols/Controller';

export const makeSearchRepositoryController = (): Controller => {
  const GITHUB_API_URL = process.env.GITHUB_API_URL as string;
  const axiosAdapter = new AxiosAdapter();
  const gitRepository = new GitRepository(GITHUB_API_URL, axiosAdapter);

  return new SearchRepositoryController(gitRepository);
};
