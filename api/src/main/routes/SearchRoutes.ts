import { Router } from 'express';
import { adaptRoute } from '../adapters/ExpressRouteAdapter';
import { makeSearchRepositoryController } from '../factories/SearchFactory';

export default (router: Router): void => {
  router.get('/api/search', adaptRoute(makeSearchRepositoryController()));
};
