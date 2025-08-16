import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/repositories/repositories.component').then(
        (c) => c.Repositories
      ),
  },
  {
    path: 'repository/:owner/:name',
    loadComponent: () =>
      import('./features/repository-detail/repository-detail.component').then(
        (c) => c.RepositoryDetailComponent
      ),
  },
];
