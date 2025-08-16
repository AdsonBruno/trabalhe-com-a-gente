import { Component, signal, computed, OnInit } from '@angular/core';

import { GithubService } from './services/github.service';
import { RepositoryAdapter } from './adapters/repository.adapter';
import { Repository } from './models/repository.model';
import { CommonModule } from '@angular/common';
import { RepositoryCardComponent } from './components/repository-card/repository-card.component';
import { StateService } from '../../core/state.service';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule, RepositoryCardComponent],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
})
export class Repositories implements OnInit {
  repositories = signal<Repository[]>([]);
  hasSearched = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  currentQuery = signal<string>('');
  currentPage = signal<number>(1);
  totalResults = signal<number>(0);
  readonly itemsPerPage = 20;

  totalPages = computed(() =>
    Math.ceil(this.totalResults() / this.itemsPerPage)
  );

  constructor(
    private githubService: GithubService,
    private adapter: RepositoryAdapter,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    const lastQuery = this.stateService.getLastSearchQuery();

    if (lastQuery) {
      this.repositories.set(this.stateService.getLastSearchResults());
      this.currentQuery.set(lastQuery);
      this.currentPage.set(this.stateService.getLastSearchPage());
      this.totalResults.set(this.stateService.getLastTotalResults());
      this.hasSearched.set(true);
    }
  }

  onSearch(query: string): void {
    if (!query) return;

    this.currentQuery.set(query);
    this.currentPage.set(1);
    this.hasSearched.set(true);
    this.fetchRepositories(query, 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;

    this.currentPage.set(page);
    this.fetchRepositories(this.currentQuery(), page);
  }

  private fetchRepositories(query: string, page: number): void {
    this.isLoading.set(true);
    this.repositories.set([]);

    this.githubService
      .searchRepositories(query, page, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          const adaptedRepositories = response.items.map((item) =>
            this.adapter.adapt(item)
          );

          this.repositories.set(adaptedRepositories);
          const total = Math.min(response.total_count, 1000);
          this.totalResults.set(total);
          this.isLoading.set(false);

          this.stateService.cacheSearchState(
            adaptedRepositories,
            query,
            page,
            total
          );
        },
        error: (err) => {
          console.error('Erro ao buscar repositórios: ', err);
          this.isLoading.set(false);
          this.repositories.set([]);
          this.totalResults.set(0);
        },
      });
  }

  selectRepository(repository: Repository): void {
    this.stateService.setSelectedRepository(repository);
  }
}
