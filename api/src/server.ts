import express from 'express';
import { AxiosAdapter } from './infra/http/AxiosAdapter';
import { GitRepository } from './data/services/GitRepository';
import { SearchRepositoryController } from './presentation/controllers/searchRepository';
import { adaptRoute } from './main/adapters/ExpressRouteAdapter';

const GITHUB_API_URL = 'https://api.github.com/search/repositories';
const axiosAdapter = new AxiosAdapter();
const gitRepository = new GitRepository(GITHUB_API_URL, axiosAdapter);
const searchRepositoryController = new SearchRepositoryController(
  gitRepository
);

const app = express();
app.use(express.json());

app.post('/api/search', adaptRoute(searchRepositoryController));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
