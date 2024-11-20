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

  legalLinkText: string ='Legal Notice';
  legalLinkHref: string = 'assets/legalNotice.html';

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
      this.legalLinkHref = 'assets/impressum.html'
  } else if (this.currentLanguage === 'en') {
      this.legalLinkText = 'Legal Notice';
      this.legalLinkHref = 'assets/legalNotice.html'
  } else {
      // Fallback-Sprache (optional, Englisch als Standard)
      this.legalLinkText = 'Legal Notice';
      this.legalLinkHref = 'assets/legalNotice.html'
  }
}



}
