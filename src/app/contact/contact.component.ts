import { Component, ViewChild, ElementRef, OnDestroy, OnInit,inject } from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {

  @ViewChild('contactContainer', {static:false}) contactContainer!: ElementRef;
  private scrollSubscription!: Subscription;

  http = inject(HttpClient);

  contactData = {
    name: "",
    email: "",
    message: ""
  }

  mailTest = false;

  post = {
    endPoint: 'https://bjoern-bressler.de/developer/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  constructor(private scrollService: ScrollService, private languageService: LanguageService){
    
  
    

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

changeLanguage(newLanguage: string){
      this.languageService.setLanguage(newLanguage);
}

onSubmit(ngForm: NgForm) {
  if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
    this.http.post(this.post.endPoint, this.post.body(this.contactData))
      .subscribe({
        next: (response) => {

          ngForm.resetForm();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => console.info('send post complete'),
      });
  } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {

    ngForm.resetForm();
  }
}

}
