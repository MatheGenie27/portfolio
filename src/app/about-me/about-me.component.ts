import { Component } from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  currentLanguage: string = 'en';

  headertitle = "Let's work together";
  headertext = 'I am';
  locationText = 'located in Kaiserslautern';
  remoteText = 'open to work remote';
  relocateText = 'open to relocate';
  aboutText =
    'I am a Front-End Developer based in Kaiserslautern, Germany. I enjoy helping designers and companies bring their ideas to life. I am eager to advance my developer career by securing a position as a Junior Web Developer. My strong problem-solving skills and passion for programming make me a valuable addition to any team.';
  aboutText2 =
    'If you believe I’d be a great fit for your projects, feel free to contact me!';
  messageButton = 'Send a message';

  locationIconPath = 'assets/icons/location.svg';
  remoteIconPath = 'assets/icons/Icon Remote.svg';
  relocateIconPath = 'assets/icons/iconRelocate.svg';

  constructor(
    private scrollService: ScrollService,
    private languageService: LanguageService
  ) {}

  /**
   * triggers the function that Scrolls to the ContactSection
   */
  onScrollToContact() {
    this.scrollService.triggerScrollContact();
  }
  /**
   * changes the Icon if hovered upon
   * @param isHovered {boolean}
   */
  locationOnHover(isHovered: boolean) {
    this.locationIconPath = isHovered
      ? 'assets/icons/locationHover.svg'
      : 'assets/icons/location.svg';
  }

  /**
   * changes the Icon if hovered upon
   * @param isHovered {boolean}
   */
  remoteOnHover(isHovered: boolean) {
    this.remoteIconPath = isHovered
      ? 'assets/icons/IconRemoteHover.svg'
      : 'assets/icons/Icon Remote.svg';
  }

  /**
   * changes the Icon if hovered upon
   * @param isHovered {boolean}
   */
  relocateOnHover(isHovered: boolean) {
    this.relocateIconPath = isHovered
      ? 'assets/icons/iconRelocateHover.svg'
      : 'assets/icons/iconRelocate.svg';
  }

  /**
   * initates the component
   */
  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
      this.updateTexts();
    });
  }

  /**
   * changes texts to german or english
   */
  private updateTexts(): void {
    if (this.currentLanguage === 'de') {
      this.headertitle = 'Lass uns was schaffen';
      this.headertext = 'Ich bin';
      this.locationText = 'aus Kaiserslautern';
      this.remoteText = 'offen für Remote-Arbeit';
      this.relocateText = 'bereit umzuziehen';
      this.aboutText =
        'Ich bin ein Front-End-Entwickler aus Kaiserslautern, Deutschland. Ich helfe gerne Designern und Unternehmen, ihre Ideen zum Leben zu erwecken. Ich bin bestrebt, meine Entwicklerkarriere durch eine Position als Junior-Webentwickler voranzutreiben. Meine starken Problemlösungsfähigkeiten und meine Leidenschaft für Programmierung machen mich zu einer wertvollen Bereicherung für jedes Team.';
      this.aboutText2 =
        'Wenn Sie glauben, dass ich gut zu Ihren Projekten passe, kontaktieren Sie mich gerne!';
      this.messageButton = 'Nachricht senden';
    } else if (this.currentLanguage === 'en') {
      this.headertitle = "Let's work together";
      this.headertext = 'I am';
      this.locationText = 'located in Kaiserslautern';
      this.remoteText = 'open to work remote';
      this.relocateText = 'open to relocate';
      this.aboutText =
        'I am a Front-End Developer based in Kaiserslautern, Germany. I enjoy helping designers and companies bring their ideas to life. I am eager to advance my developer career by securing a position as a Junior Web Developer. My strong problem-solving skills and passion for programming make me a valuable addition to any team.';
      this.aboutText2 =
        'If you believe I’d be a great fit for your projects, feel free to contact me!';
      this.messageButton = 'Send a message';
    } else {
      this.headertitle = "Let's work together";
      this.headertext = 'I am';
      this.locationText = 'located in Kaiserslautern';
      this.remoteText = 'open to work remote';
      this.relocateText = 'open to relocate';
      this.aboutText =
        'I am a Front-End Developer based in Kaiserslautern, Germany. I enjoy helping designers and companies bring their ideas to life. I am eager to advance my developer career by securing a position as a Junior Web Developer. My strong problem-solving skills and passion for programming make me a valuable addition to any team.';
      this.aboutText2 =
        'If you believe I’d be a great fit for your projects, feel free to contact me!';
      this.messageButton = 'Send a message';
    }
  }
}
