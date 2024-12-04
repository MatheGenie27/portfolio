import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
})
export class PrivacyComponent {



  
  currentLanguage: string = 'en';
  
  
  
  constructor ( private languageService: LanguageService, private router: Router){} 
  
  
  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
      
      // Überprüfen, ob die Sprache auf "de" gewechselt wird, und zu "legalNotice" navigieren
      if (language === 'de') {
       
        this.router.navigate(['/datenschutz']);
      }


    });
  }






  /**
   * scrolls to the top of the page
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
