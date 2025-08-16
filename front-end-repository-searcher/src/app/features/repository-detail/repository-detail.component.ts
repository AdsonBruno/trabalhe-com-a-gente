import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { CapitalizePipe } from '../repositories/pipes/capitalize-pipe';
import { LanguageColorPipe } from '../repositories/pipes/language-color.pipe';
import { Repository } from '../repositories/models/repository.model';
import { StateService } from '../../core/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repository-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, CapitalizePipe, LanguageColorPipe],
  templateUrl: './repository-detail.component.html',
  styleUrl: './repository-detail.component.scss',
})
export class RepositoryDetailComponent implements OnInit {
  repository = signal<Repository | undefined>(undefined);

  constructor(
    private stateService: StateService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const repoData = this.stateService.getSelectedRepository();

    if (repoData) {
      this.repository.set(repoData);
    } else {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
