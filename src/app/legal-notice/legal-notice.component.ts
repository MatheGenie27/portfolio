import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent {



  currentLanguage: string = 'en';
  
  
  
  constructor ( private languageService: LanguageService, private router: Router){} 
  
  
  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
      
      // Überprüfen, ob die Sprache auf "de" gewechselt wird, und zu "legalNotice" navigieren
      if (language === 'de') {
       
        this.router.navigate(['/impressum']);
      }


    });
  }











  /**
   * scrolls to the Top of the page
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
