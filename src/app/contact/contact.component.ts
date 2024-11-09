import { Component, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {

  @ViewChild('contactContainer', {static:false}) contactContainer!: ElementRef;
  private scrollSubscription!: Subscription;

  constructor(private scrollService: ScrollService){
   

  }

  ngOnInit(){
    this.scrollSubscription = this.scrollService.scrollToContact$.subscribe(() => {
      if (this.contactContainer) {
        this.contactContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.error("contactContainer is not available.");
      }
    });
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe(); // Vermeidung von Memory-Leaks
  }

}
