import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubSearchResponse } from '../models/github-api.model';

const GITHUB_API_URL = 'http://localhost:3000/api/search';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  searchRepositories(query: string): Observable<GithubSearchResponse> {
    const params = new HttpParams().set('query', query);

    return this.http.get<GithubSearchResponse>(GITHUB_API_URL, { params });
  }
}
