import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';


@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.scss',
})
export class DatenschutzComponent {


  currentLanguage: string = 'de';
  
  
  
  constructor ( private languageService: LanguageService, private router: Router){} 
  
  
  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;

      // Überprüfen, ob die Sprache auf "en" gewechselt wird und wir uns auf der Datenschutz-Seite befinden
      if (language === 'en' && this.router.url.includes('datenschutz')) {
        // Navigiere zur Seite "privacy"
        this.router.navigate(['/privacy']);
      } else if (language === 'de' && this.router.url.includes('privacy')) {
        // Wenn die Sprache wieder auf Deutsch gesetzt wird, navigiere zurück zu Datenschutz
        this.router.navigate(['/datenschutz']);
      }
    });
  }










  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
