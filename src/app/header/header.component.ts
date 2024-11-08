import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  aboutMe = 'About me';

  constructor(private languageService: LanguageService) {

  }

  changeLanguage(newLanguage: string){
    this.languageService.setLanguage(newLanguage);
  }

}

