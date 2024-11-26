import { Component } from '@angular/core';
import { AtfComponent } from '../atf/atf.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { SkillsetComponent } from '../skillset/skillset.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ReferencesComponent } from '../references/references.component';
import { ContactComponent } from '../contact/contact.component';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent,AtfComponent, AboutMeComponent, SkillsetComponent, ProjectsComponent, ReferencesComponent, ContactComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
