import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Project } from './project/project.model';
import { PROJECTS } from './project/projects.data';
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




  currentLanguage: string = 'de';
  
  title: string = 'My work';
  sectionText: string = 'Explore a selection of my work here - Interact with projects to see my skills in action';
  
  
  
  projects: Project[] = [];

  constructor(private languageService: LanguageService){

  }

  ngOnInit(): void {
    // Sprache abonnieren
    this.languageService.language$.subscribe(language => {
      this.currentLanguage = language;
    });

    // Initialisiere Originaldaten
    this.projects = PROJECTS; // Initiale Gruppierung
  }

  


}
