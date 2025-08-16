import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Repository } from '../../models/repository.model';
import { LanguageColorPipe } from '../../pipes/language-color.pipe';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-repository-card',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    LanguageColorPipe,
    CapitalizePipe,
    RouterLink,
  ],
  templateUrl: './repository-card.component.html',
  styleUrl: './repository-card.component.scss',
})
export class RepositoryCardComponent {
  @Input({ required: true }) repository!: Repository;
}
