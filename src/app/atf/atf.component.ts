import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-arf',
  standalone: true,
  imports: [],
  templateUrl: './atf.component.html',
  styleUrl: './atf.component.scss',
})
export class AtfComponent {
  currentLanguage: string = 'en';

  greet = 'Hello! I am Björn';
  title1 = 'FRONTEND';
  title2 = 'DEVELOPER';

  constructor(private languageService: LanguageService) {}

  /**
   * initiates the component
   */
  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
      this.updateTexts();
    });
  }

  /**
   * changes the texts to German or English
   */
  private updateTexts(): void {
    if (this.currentLanguage === 'de') {
      this.greet = 'Hallo! Ich bin Björn';
      this.title1 = 'FRONTEND';
      this.title2 = 'ENTWICKLER';
    } else if (this.currentLanguage === 'en') {
      this.greet = 'Hello! I am Björn';
      this.title1 = 'FRONTEND';
      this.title2 = 'DEVELOPER';
    } else {
      // Fallback-Sprache (optional)
      this.greet = 'Hello! I am Björn';
      this.title1 = 'FRONTEND';
      this.title2 = 'DEVELOPER';
    }
  }
}
