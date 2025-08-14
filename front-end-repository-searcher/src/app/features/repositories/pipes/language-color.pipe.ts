import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageColor',
  standalone: true,
})
export class LanguageColorPipe implements PipeTransform {
  private languageColorMap: { [key: string]: string } = {
    typescript: '#3178c6',
    javascript: '#f1e05a',
    python: '#3572A5',
    java: '#b07219',
    csharp: '#178600',
    php: '#4F5D95',
    html: '#e34c26',
    css: '#563d7c',
    scss: '#c6538c',
    ruby: '#701516',
    go: '#00ADD8',
    dart: '#00B4AB',
  };

  transform(language: string | null): string {
    if (!language) {
      return '#cccccc';
    }

    const langKey = language.toLowerCase().replace(/\s/g, '_');

    return this.languageColorMap[langKey] || '#cccccc';
  }
}
