import { Component, HostListener } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isNavModalOpen = false;
  showCloseButtonInModal = false;
  headerHeight = 70;
  currentLanguage: string = 'en';

  icons = [
    'assets/icons/icon0.png',
    'assets/icons/icon1.png',
    'assets/icons/icon2.png',
    'assets/icons/icon3.png',
  ];

  currentIcon = this.icons[0];
  animationDirection = 'forward';

  languageIconPath = 'assets/img/united-kingdom.png';

  aboutMe = 'About me';
  skills = 'Skill set';
  work = 'My Work';

  constructor(private languageService: LanguageService) {}

  /**
   * initiates the component
   */
  ngOnInit(): void {
    // Initiale Sprache laden
    this.currentLanguage = this.languageService.currentLanguage;
    this.updateTexts();
    this.changeIcon(this.currentLanguage);

    // Sprache abonnieren
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
      this.updateTexts();
      this.changeIcon(language);
    });
  }

  /**
   * changes the Language
   * @param newLanguage {string}
   */
  changeLanguage(newLanguage: string) {
    this.languageService.setLanguage(newLanguage);
  }

  /**
   * handles the language change depending on currently used language
   */
  toggleLanguage(): void {
    const newLanguage = this.currentLanguage === 'en' ? 'de' : 'en';
    this.changeLanguage(newLanguage);
  }

  /**
   * changes the language icon depending on currently used language
   * @param newLanguage
   */
  changeIcon(newLanguage: string): void {
    if (newLanguage === 'en') {
      this.languageIconPath = 'assets/img/united-kingdom.png'; // Icon für Englisch setzen
    } else if (newLanguage === 'de') {
      this.languageIconPath = 'assets/img/german-flag-reworked.png'; // Icon für Deutsch setzen
    } else {
      this.languageIconPath = 'assets/img/united-kingdom.png'; // Fallback-Icon, falls notwendig
    }
  }

  /**
   * navModal in the responsive mobile View
   */
  toggleNavModal(): void {
    if (this.isNavModalOpen) {
      // Schließt das Modal
      this.isNavModalOpen = false;
      this.animateIcon('backward');
    } else {
      // Öffnet das Modal
      this.isNavModalOpen = true;
      this.animateIcon('forward');
    }
  }

  /**
   * animates the Icon change for the burgerIcon
   * @param direction
   */
  animateIcon(direction: 'forward' | 'backward'): void {
    const steps =
      direction === 'forward' ? this.icons : [...this.icons].reverse();
    let index = 0;

    const animationInterval = setInterval(() => {
      this.currentIcon = steps[index];
      index++;
      if (index === steps.length) {
        clearInterval(animationInterval);
      }
    }, 40); // 100ms pro Schritt
  }

  /**
   * closes the Navigation Modal
   */
  closeNavModal(): void {
    this.isNavModalOpen = false;
    this.showCloseButtonInModal = false;
    this.animateIcon('backward'); // Rückwärtsanimation
  }

  /**
   * handles scrolling
   */
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.showCloseButtonInModal = scrollPosition > this.headerHeight;
  }

  /**
   * changes the texts in the component to German or English
   */
  private updateTexts(): void {
    if (this.currentLanguage === 'de') {
      this.aboutMe = 'Über mich';
      this.skills = 'Fähigkeiten';
      this.work = 'Projekte';
    } else if (this.currentLanguage === 'en') {
      this.aboutMe = 'About me';
      this.skills = 'Skill set';
      this.work = 'My Work';
    } else {
      // Fallback-Sprache (optional)
      this.aboutMe = 'About me';
      this.skills = 'Skill set';
      this.work = 'My Work';
    }
  }
}
