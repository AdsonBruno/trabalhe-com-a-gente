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

  searchRepositories(
    query: string,
    page: number,
    perPage: number
  ): Observable<GithubSearchResponse> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<GithubSearchResponse>(GITHUB_API_URL, { params });
  }
}
