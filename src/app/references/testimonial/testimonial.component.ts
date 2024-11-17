import { Component, Input } from '@angular/core';
import { Testimonial } from '../testimonial-model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent {
  @Input() testimonial!:Testimonial;
}

