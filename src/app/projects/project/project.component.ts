import { Component, HostBinding, Input } from '@angular/core';
import { Project } from './project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  @Input() project!: Project;

  // Bindet dynamische Klassen an das äußere Host-Element
  @HostBinding('class') class!: string;
  @Input() className!: string;

  /**
   * opens the GithubLink
   * @param link
   */
  openGithubLink(link: string): void {
    if (link) {
      window.open(link, '_blank'); // Öffnet den Link in einem neuen Tab
    }
  }

  /**
   *
   * @param link opens the LiveLink
   */
  openLiveLink(link: string): void {
    if (link) {
      window.open(link, '_blank'); // Öffnet den Link in einem neuen Tab
    }
  }

  /**
   * checks if the device is Mobile/Tablet and not Desktoo/Laptop
   * @returns {boolean}
   */
  isMobileOrTablet(): boolean {
    return window.matchMedia('(max-width: 768px)').matches; // Geräte bis 768px erkennen
  }
}
