import { Component, HostBinding, Input } from '@angular/core';
import { Project } from './project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() project!:Project;

 // Bindet dynamische Klassen an das äußere Host-Element
 @HostBinding('class') class!: string;
 @Input() className!: string;



  openGithubLink(link: string): void {
    if (link) {
      window.open(link, '_blank'); // Öffnet den Link in einem neuen Tab
    }
  }

  openLiveLink(link: string): void {
    if (link) {
      window.open(link, '_blank'); // Öffnet den Link in einem neuen Tab
    }
  }

  isMobileOrTablet(): boolean {
    return window.matchMedia('(max-width: 768px)').matches; // Geräte bis 768px erkennen
  }

}
