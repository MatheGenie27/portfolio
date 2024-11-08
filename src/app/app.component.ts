import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AtfComponent } from "./atf/atf.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { SkillsetComponent } from "./skillset/skillset.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ReferencesComponent } from "./references/references.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AtfComponent, AboutMeComponent, SkillsetComponent, ProjectsComponent, ReferencesComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
