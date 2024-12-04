import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
})
export class PrivacyComponent {
  /**
   * scrolls to the top of the page
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
