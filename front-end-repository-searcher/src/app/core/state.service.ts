import { Injectable, signal } from '@angular/core';
import { Repository } from '../features/repositories/models/repository.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private selectedRepository = signal<Repository | undefined>(undefined);

  private lastSearchResults = signal<Repository[]>([]);
  private lastSearchQuery = signal<string>('');
  private lastSearchPage = signal<number>(1);
  private lastTotalResults = signal<number>(0);

  setSelectedRepository(repository: Repository): void {
    this.selectedRepository.set(repository);
  }

  getSelectedRepository(): Repository | undefined {
    return this.selectedRepository();
  }

  cacheSearchState(
    repos: Repository[],
    query: string,
    page: number,
    total: number
  ): void {
    this.lastSearchResults.set(repos);
    this.lastSearchQuery.set(query);
    this.lastSearchPage.set(page);
    this.lastTotalResults.set(total);
  }

  getLastSearchResults = () => this.lastSearchResults();
  getLastSearchQuery = () => this.lastSearchQuery();
  getLastSearchPage = () => this.lastSearchPage();
  getLastTotalResults = () => this.lastTotalResults();
}
