import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Project } from './project/project.model';
import { PROJECTS_DE } from './project/projects.data';
import { PROJECTS_EN } from './project/projects.data';
import { ProjectComponent } from './project/project.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {




  currentLanguage: string = 'en';
  
  title: string = 'My work';
  sectionText: string = 'Explore a selection of my work here - Interact with projects to see my skills in action';
  
  
  
  projects: Project[] = [];

  constructor(private languageService: LanguageService){

  }

  ngOnInit(): void {
    // Sprache abonnieren
    this.languageService.language$.subscribe(language => {
      this.currentLanguage = language;
      this.updateTexts();
      this.initializeProjects(language);
    });

    // Initialisiere Originaldaten
    this.initializeProjects(this.currentLanguage);
    
  }

  private initializeProjects(language: string): void {
    if (language === 'de') {
      this.projects = PROJECTS_DE;
    } else {
      this.projects = PROJECTS_EN; // Fallback: Englisch
    }
  }

  private updateTexts(): void {
    if (this.currentLanguage === 'de') {
      this.title = 'Meine Projekte';
      this.sectionText = 'Entdecke hier eine Auswahl meiner Arbeiten - Interagiere mit Projekten, um meine Fähigkeiten in Aktion zu sehen';
    } else if (this.currentLanguage === 'en') {
      this.title = 'My work';
      this.sectionText = 'Explore a selection of my work here - Interact with projects to see my skills in action';
    } else {
      this.title = 'My work';
      this.sectionText = 'Explore a selection of my work here';
    }
  }

  


}
