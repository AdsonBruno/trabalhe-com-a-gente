import { SearchRepositoryController } from '../../presentation/controllers/SearchRepository';
import { GitRepository } from '../../data/services/GitRepository';
import { AxiosAdapter } from '../../infra/http/AxiosAdapter';
import { Controller } from '../../presentation/protocols/Controller';
import { ZodValidatorAdapter } from '../../infra/validators/ZodValidatorAdapter';
import { searchQuerySchema } from '../schemas/SearchQueryParams';
import { RedisAdapter } from '../../infra/cache/RedisAdapter';

export const makeSearchRepositoryController = (): Controller => {
  const GITHUB_API_URL = process.env.GITHUB_API_URL as string;
  const axiosAdapter = new AxiosAdapter();
  const redisAdapter = new RedisAdapter();
  const gitRepository = new GitRepository(
    GITHUB_API_URL,
    axiosAdapter,
    redisAdapter
  );

  const validator = new ZodValidatorAdapter(searchQuerySchema);

  return new SearchRepositoryController(gitRepository, validator);
};
