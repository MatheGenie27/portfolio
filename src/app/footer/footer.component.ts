import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  currentLanguage: string = 'en';

  legalLinkText: string ='Legal Notice'

constructor(private languageService: LanguageService){

}

ngOnInit(): void {
  // Sprache abonnieren
  this.languageService.language$.subscribe(language => {
    this.currentLanguage = language;
    this.updateTexts();
    
  });
}


private updateTexts(): void {
  if (this.currentLanguage === 'de') {
      this.legalLinkText = 'Impressum';
  } else if (this.currentLanguage === 'en') {
      this.legalLinkText = 'Legal Notice';
  } else {
      // Fallback-Sprache (optional, Englisch als Standard)
      this.legalLinkText = 'Legal Notice';
  }
}



}
