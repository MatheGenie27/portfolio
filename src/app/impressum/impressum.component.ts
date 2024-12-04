import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss'], // Korrektur: styleUrl -> styleUrls
})
export class ImpressumComponent {

  currentLanguage: string = 'de';

  constructor(private languageService: LanguageService, private router: Router) {}

  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;

      // Überprüfen, ob die Sprache auf "en" gewechselt wird und wir uns auf der Impressum-Seite befinden
      if (language === 'en' && this.router.url.includes('impressum')) {
        // Navigiere zur Seite "legalNotice"
        this.router.navigate(['/legalNotice']);
      } else if (language === 'de' && this.router.url.includes('legalNotice')) {
        // Wenn die Sprache auf "de" gesetzt wird und wir auf der "legalNotice"-Seite sind, navigiere zu Impressum
        this.router.navigate(['/impressum']);
      }
    });
  }

  /**
   * scrolls to the Top of the Page
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
