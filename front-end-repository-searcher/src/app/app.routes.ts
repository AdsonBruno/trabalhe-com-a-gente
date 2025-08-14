import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/repositories/repositories.component').then(
        (c) => c.Repositories
      ),
  },
];
