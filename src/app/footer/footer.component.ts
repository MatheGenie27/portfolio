import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentLanguage: string = 'en';

  legalLinkText: string = 'Legal Notice';
  legalLinkHref: string = '/legalNotice';

  policyLink = 'privacy';
  privacyLinkText = 'Privacy Policy';

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
   * changes the texts of the component to German or English
   */
  private updateTexts(): void {
    if (this.currentLanguage === 'de') {
      this.legalLinkText = 'Impressum';
      this.legalLinkHref = 'impressum';
      this.policyLink = 'datenschutz';
      this.privacyLinkText = 'Datenschutz';
    } else if (this.currentLanguage === 'en') {
      this.legalLinkText = 'Legal Notice';
      this.legalLinkHref = 'legalNotice';
      this.policyLink = 'privacy';
      this.privacyLinkText = 'Privacy Policy';
    } else {
      this.legalLinkText = 'Legal Notice';
      this.legalLinkHref = 'legalNotice';
      this.policyLink = 'privacy';
      this.privacyLinkText = 'Privacy Policy';
    }
  }
}
