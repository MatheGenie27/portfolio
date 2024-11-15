import { Component,OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { SkillComponent } from './skill/skill.component';
import { SKILLS} from './skillset.data';
import { Skill } from './skill/skill.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-skillset',
  standalone: true,
  imports: [SkillComponent, CommonModule],
  templateUrl: './skillset.component.html',
  styleUrl: './skillset.component.scss'
})
export class SkillsetComponent implements OnInit{

  currentLanguage: string = 'de';

  title = 'Skill set';
  skills: Skill[] = [];

  


  constructor(private languageService: LanguageService){

  }

  ngOnInit():void {
    this.languageService.language$.subscribe(language => {
      this.currentLanguage = language;
      
    });

    this.skills = SKILLS;
  }  
}
