import { Injectable } from '@angular/core';
import { GithubRepositoryItem } from '../models/github-api.model';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoryAdapter {
  adapt(item: GithubRepositoryItem): Repository {
    return {
      id: item.id,
      name: item.name,
      fullName: item.full_name,
      htmlUrl: item.html_url,
      description: item.description,
      language: item.language,
      starCount: item.stargazers_count,
      forksCount: item.forks_count,
      updatedAt: item.updated_at,
      ownerLogin: item.owner.login,
      ownerAvatarUrl: item.owner.avatar_url,
      topics: item.topics,
    };
  }
}
