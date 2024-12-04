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
      
      // Überprüfen, ob die Sprache auf "de" gewechselt wird, und zu "legalNotice" navigieren
      if (language === 'en') {
       
        this.router.navigate(['/privacy']);
      }


    });
  }










  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
