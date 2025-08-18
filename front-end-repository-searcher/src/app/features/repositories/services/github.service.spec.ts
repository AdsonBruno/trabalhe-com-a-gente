import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { GithubService } from './github.service';
import { GithubSearchResponse } from '../models/github-api.model';

describe('Github Service', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        GithubService,
      ],
    });

    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch repositories and return the expected data', () => {
    const mockResponse: GithubSearchResponse = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          id: 1,
          name: 'test-repo',
          full_name: 'user/test-repo',
          owner: { login: 'user', avatar_url: '' },
          html_url: '',
          description: 'A test repository',
          stargazers_count: 10,
          forks_count: 5,
          language: 'TypeScript',
          topics: ['test'],
          updated_at: new Date().toISOString(),
        },
      ],
    };

    const query = 'angular';
    const page = 1;
    const perPage = 10;

    service.searchRepositories(query, page, perPage).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const expectedUrl = `http://localhost:3000/api/search?query=${query}&page=${page}&per_page=${perPage}`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });
});
