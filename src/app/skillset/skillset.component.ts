import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { SkillComponent } from './skill/skill.component';
import { SKILLS } from './skillset.data';
import { Skill } from './skill/skill.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skillset',
  standalone: true,
  imports: [SkillComponent, CommonModule],
  templateUrl: './skillset.component.html',
  styleUrl: './skillset.component.scss',
})
export class SkillsetComponent implements OnInit {
  currentLanguage: string = 'en';

  title = 'Skill set';
  skills: Skill[] = [];

  constructor(private languageService: LanguageService) {}

  /**
   * initiates Component
   */
  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
      this.updateTexts();
    });

    this.skills = SKILLS;
  }

  /**
   * changes Texts to German or English
   */
  private updateTexts(): void {
    if (this.currentLanguage === 'de') {
      this.title = 'Fähigkeiten';
    } else if (this.currentLanguage === 'en') {
      this.title = 'Skill set';
    } else {
      this.title = 'Skill set';
    }
  }
}
