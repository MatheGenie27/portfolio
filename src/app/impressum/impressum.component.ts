import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss',
})
export class ImpressumComponent {
  /**
   * scrolls to the Top of the Page
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
