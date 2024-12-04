import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss',
})
export class ImpressumComponent {
  
  
  currentLanguage: string = 'de';
  
  
  
  constructor ( private languageService: LanguageService, private router: Router){} 
  
  
  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
      
      // Überprüfen, ob die Sprache auf "de" gewechselt wird, und zu "legalNotice" navigieren
      if (language === 'en') {
       
        this.router.navigate(['/legalNotice']);
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


