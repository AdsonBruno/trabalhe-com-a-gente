import { Component, OnInit, signal } from '@angular/core';

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
export class Repositories implements OnInit {
  repositories = signal<Repository[]>([]);

  constructor(
    private githubService: GithubService,
    private adapter: RepositoryAdapter
  ) {}

  ngOnInit(): void {
    this.onSearch('angular');
  }

  onSearch(query: string): void {
    this.githubService
      .searchRepositories(query)
      .pipe(
        map((response) =>
          response.items.map((item) => this.adapter.adapt(item))
        )
      )
      .subscribe((repositories) => {
        this.repositories.set(repositories);
        console.log('Dados recebidos e adaptados: ', this.repositories());
      });
  }
}
