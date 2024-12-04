import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { Testimonial } from './testimonial-model';
import { REFERENCES_EN } from './references.data';
import { REFERENCES_DE } from './references.data';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [TestimonialComponent, CommonModule, NgbCarouselModule],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss'], // Korrektur hier
})
export class ReferencesComponent implements OnInit {
  currentLanguage: string = 'en';
  title = 'References';
  header = 'Need a teamplayer?';
  subheader = 'Here what my colleagues said about me';

  references: Testimonial[][] = []; // Referenzen in Gruppen
  originalReferences: Testimonial[] = []; // Originaldaten

  constructor(private languageService: LanguageService) {}

  /**
   * initiaes Component
   */
  ngOnInit(): void {
    this.initLanguage();

    this.initializeReferences(this.currentLanguage);
  }

  /**
   * initiates Language
   */
  initLanguage() {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
      this.updateTexts();
      this.initializeReferences(language);
    });
  }

  /**
   * inits the References
   * @param language
   */
  private initializeReferences(language: string): void {
    if (language === 'de') {
      this.originalReferences = REFERENCES_DE;
    } else {
      this.originalReferences = REFERENCES_EN; // Fallback: Englisch
    }

    this.references = this.groupReferences(this.originalReferences);
  }

  /**
   * Groups Refrences in relation to screenwidth
   * @param references
   * @returns
   */
  groupReferences(references: Testimonial[]): Testimonial[][] {
    if (!references || references.length === 0) {
      return [];
    }
    const groupSize = this.getGroupSize();
    const groups: Testimonial[][] = [];
    for (let i = 0; i < references.length; i += groupSize) {
      groups.push(references.slice(i, i + groupSize));
    }
    return groups;
  }

  /**
   * calculates group sitze based on screen width
   * @returns
   */
  getGroupSize(): number {
    const screenWidth = window.innerWidth;
    return screenWidth > 768 ? 3 : 1;
  }

  /**
   * listens to the resizing of the window to actualize the groupsize
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.references = this.groupReferences(this.originalReferences); // Gruppierung aktualisieren
  }

  /**
   * changes the texts to German or English
   */
  private updateTexts(): void {
    if (this.currentLanguage === 'de') {
      this.title = 'Referenzen';
      this.header = 'Brauchen Sie einen Teamplayer?';
      this.subheader = 'Hier ist, was meine Kollegen über mich gesagt haben';
    } else if (this.currentLanguage === 'en') {
      this.title = 'References';
      this.header = 'Need a teamplayer?';
      this.subheader = 'Here what my colleagues said about me';
    } else {
      // Fallback-Sprache (optional, Englisch als Standard)
      this.title = 'References';
      this.header = 'Need a teamplayer?';
      this.subheader = 'Here what my colleagues said about me';
    }
  }
}
