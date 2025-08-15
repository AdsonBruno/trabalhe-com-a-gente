import { Component, signal } from '@angular/core';

import { GithubService } from './services/github.service';
import { RepositoryAdapter } from './adapters/repository.adapter';
import { Repository } from './models/repository.model';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { RepositoryCardComponent } from './components/repository-card/repository-card.component';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule, RepositoryCardComponent],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
})
export class Repositories {
  repositories = signal<Repository[]>([]);
  hasSearched = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  constructor(
    private githubService: GithubService,
    private adapter: RepositoryAdapter
  ) {}

  // ngOnInit(): void {
  //   this.onSearch('angular');
  // }

  onSearch(query: string): void {
    if (!query) return;

    this.isLoading.set(true);
    this.hasSearched.set(true);

    this.githubService
      .searchRepositories(query)
      .pipe(
        map((response) =>
          response.items.map((item) => this.adapter.adapt(item))
        )
      )
      .subscribe({
        next: (repositories) => {
          this.repositories.set(repositories);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.log('Erro ao buscar repositórios: ', err);

          this.isLoading.set(false);
          this.repositories.set([]);
        },
      });
  }
}
