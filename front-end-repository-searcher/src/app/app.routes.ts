import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/repositories/repositories').then(
        (c) => c.Repositories
      ),
  },
];
