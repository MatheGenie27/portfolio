import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'; 
import { TestimonialComponent } from './testimonial/testimonial.component';
import { Testimonial } from './testimonial-model';
import { REFRENCES } from './references.data';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [TestimonialComponent, CommonModule, NgbCarouselModule],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss'], // Korrektur hier
})
export class ReferencesComponent implements OnInit {
  currentLanguage: string = 'de';
  title = "References";
  header = "Need a teamplayer?";
  subheader = "Here what my colleagues said about me";

  references: Testimonial[][] = []; // Referenzen in Gruppen
  originalReferences: Testimonial[] = []; // Originaldaten

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Sprache abonnieren
    this.languageService.language$.subscribe(language => {
      this.currentLanguage = language;
    });

    // Initialisiere Originaldaten
    this.originalReferences = REFRENCES;
    this.references = this.groupReferences(this.originalReferences); // Initiale Gruppierung
  }

  // Gruppiert Testimonials basierend auf der Bildschirmbreite
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

  // Berechnet Gruppengröße basierend auf Bildschirmbreite
  getGroupSize(): number {
    const screenWidth = window.innerWidth;
    return screenWidth > 768 ? 3 : 1;
  }

  // Aktualisiert die Gruppierung bei Fenstergrößenänderung
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.references = this.groupReferences(this.originalReferences); // Gruppierung aktualisieren
  }
}
