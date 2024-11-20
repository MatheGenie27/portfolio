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
  policyAccepted = false;

  

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

  currentLanguage: string = 'en';

  header ='Contact';
  text = 'Contact me through this form. I am excited to hear from you, learn about your ideas, and contribute to your projects with my skills and dedication.';
  catch = 'Got a problem to solve?';
  callToAction ='Need a Frontend Developer?';
  callToAction2 ='Contact me!';

  inputNamePlaceholder = 'Your name...';
  inputEmailPlaceholder = 'Your email...';
  inputMessagePlaceholder = 'write something...';
  privaceLabel1 = "I've read the";
  privacyLinkText = 'privacy policy';
  privacyLabel2 = 'and agree to the processing of my data as outlined';
  buttonText ='Say hello ;)';

  policyLink = 'assets/policy.html';

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

     // Sprache abonnieren
     this.languageService.language$.subscribe(language => {
      this.currentLanguage = language;
      this.updateTexts();
    });
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe(); // Vermeidung von Memory-Leaks
  }

changeLanguage(newLanguage: string){
      this.languageService.setLanguage(newLanguage);
}

isFormValid(contactForm: any): boolean {
  return contactForm.valid && this.policyAccepted;
}

onSubmit(ngForm: NgForm) {
  if(this.isFormValid(ngForm)){
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


private updateTexts(): void {
  if (this.currentLanguage === 'de') {
    this.header = 'Kontakt';
    this.text = 'Kontaktieren Sie mich über dieses Formular. Ich freue mich darauf, von Ihnen zu hören, mehr über Ihre Ideen zu erfahren und mit meinen Fähigkeiten und meinem Engagement zu Ihren Projekten beizutragen.';
    this.catch = 'Haben Sie ein Problem zu lösen?';
    this.callToAction = 'Brauchen Sie einen Frontend-Entwickler?';
    this.callToAction2 = 'Schreiben Sie mir!';

    this.inputNamePlaceholder = 'Ihr Name...';
    this.inputEmailPlaceholder = 'Ihre E-Mail...';
    this.inputMessagePlaceholder = 'Schreiben Sie etwas...';
    this.privaceLabel1 = 'Ich habe die';
    this.privacyLinkText = 'Datenschutzerklärung';
    this.privacyLabel2 = 'gelesen und stimme der Verarbeitung meiner Daten gemäß dieser zu.';
    this.buttonText = 'Hallo sagen ;)';
    this.policyLink ='assets/datenschutz.html';
  } else if (this.currentLanguage === 'en') {
    this.header = 'Contact';
    this.text = 'Contact me through this form. I am excited to hear from you, learn about your ideas, and contribute to your projects with my skills and dedication.';
    this.catch = 'Got a problem to solve?';
    this.callToAction = 'Need a Frontend Developer?';
    this.callToAction2 = 'Contact me!';

    this.inputNamePlaceholder = 'Your name...';
    this.inputEmailPlaceholder = 'Your email...';
    this.inputMessagePlaceholder = 'Write something...';
    this.privaceLabel1 = "I've read the";
    this.privacyLinkText = 'privacy policy';
    this.privacyLabel2 = 'and agree to the processing of my data as outlined.';
    this.buttonText = 'Say hello ;)';
    this.policyLink = 'assets/policy.html';
  } else {
    // Fallback-Sprache (optional, Englisch als Standard)
    this.header = 'Contact';
    this.text = 'Contact me through this form. I am excited to hear from you, learn about your ideas, and contribute to your projects with my skills and dedication.';
    this.catch = 'Got a problem to solve?';
    this.callToAction = 'Need a Frontend Developer?';
    this.callToAction2 = 'Contact me!';

    this.inputNamePlaceholder = 'Your name...';
    this.inputEmailPlaceholder = 'Your email...';
    this.inputMessagePlaceholder = 'Write something...';
    this.privaceLabel1 = "I've read the";
    this.privacyLinkText = 'privacy policy';
    this.privacyLabel2 = 'and agree to the processing of my data as outlined.';
    this.buttonText = 'Say hello ;)';
    this.policyLink = 'assets/policy.html';
  }
}




}
