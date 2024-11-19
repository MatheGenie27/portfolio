import { Component, HostListener } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isNavModalOpen=false;
  showCloseButtonInModal = false;
  headerHeight= 70;

  icons = [
    'assets/icons/icon0.png',
    'assets/icons/icon1.png',
    'assets/icons/icon2.png',
    'assets/icons/icon3.png',

  ];

  currentIcon = this.icons[0];
  animationDirection = "forward";




  aboutMe = 'About me';



  constructor(private languageService: LanguageService) {

  }

  changeLanguage(newLanguage: string){
    this.languageService.setLanguage(newLanguage);
  }



/// Öffnet/Schließt das Modal und animiert das Icon
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

// Animiert den Wechsel der Icons
animateIcon(direction: 'forward' | 'backward'): void {
  const steps = direction === 'forward' ? this.icons : [...this.icons].reverse();
  let index = 0;

  const animationInterval = setInterval(() => {
    this.currentIcon = steps[index];
    index++;
    if (index === steps.length) {
      clearInterval(animationInterval);
    }
  }, 40); // 100ms pro Schritt
}

// Schließt das Modal (z.B. bei Klick auf einen Link)
closeNavModal(): void {
  this.isNavModalOpen = false;
  this.showCloseButtonInModal = false;
  this.animateIcon('backward'); // Rückwärtsanimation
}

// Überwacht das Scrollen
@HostListener('window:scroll', [])
onScroll(): void {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  this.showCloseButtonInModal = scrollPosition > this.headerHeight;
}


}

