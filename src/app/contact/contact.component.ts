import { Component, ViewChild, ElementRef, OnDestroy, OnInit,inject } from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
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

  policyLink = 'privacy';

  inputNameLabel = 'Your name';
  inputEmailLabel = 'Your email';
  inputMessageLabel = 'Your message';
  requiredTextName = 'Your name is required';
  requiredTextEmail ='Your email is required';
  requiredTextMessage='Your message is empty';
  requiredTextPrivacy='Please accept the privacy policy'

  feedbackText = 'Message sent'
  feedbackSuccess = 'Message sent';
  feedbackFail = 'Something went wrong';
  isFeedbackSuccess: boolean = false;

  isNameLabelVisible: boolean = false;
  isEmailLabelVisible: boolean = false;
  isMessageLabelVisible: boolean = false;
  isSubmitFeedbackVisible: boolean = false;

  isNameValid: boolean = false;
  isEmailValid: boolean = false;
  isMessageValid: boolean = false;

  nameChecked = false;
  emailChecked = false;
  messageChecked = false;
  policyChecked = false;

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


onNameFocus(): void{
  this.isNameLabelVisible = true;
  this.hideSubmitFeedback();
}

onNameBlur(): void {
  if(!this.contactData.name){
    this.isNameLabelVisible=false;
  }
  this.checkNameValidation();
}

checkNameValidation(){
  this.nameChecked = true;
  const nameFieldValue = this.contactData.name;
    if (nameFieldValue && nameFieldValue.trim().length >= 3) {
      this.isNameValid = true;
    } else {
      this.isNameValid = false;
    }

}

onNameInput(event: any):void{
  this.nameChecked = false;
  if(event.target.value){
    this.isNameLabelVisible = true;
    this.nameChecked = false;
  } else {
    this.isNameLabelVisible = false;
  }
  this.checkNameValidation();
}



onEmailFocus(): void {
  this.isEmailLabelVisible = true;
  this.hideSubmitFeedback();
}

onEmailBlur(): void {
  if (!this.contactData.email) {
    this.isEmailLabelVisible = false;
  }
  this.checkEmailValidation()
}

checkEmailValidation(){
  this.emailChecked = true;
  
  const emailFieldValue = this.contactData.email;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (emailFieldValue && emailPattern.test(emailFieldValue)) {
      this.isEmailValid = true;
    } else {
      this.isEmailValid = false;
    }
}

onEmailInput(event: any): void {
  this.emailChecked = false;
  if (event.target.value) {
    this.isEmailLabelVisible = true;
    this.emailChecked = false;
  } else {
    this.isEmailLabelVisible = false;
  }
  this.checkEmailValidation();
}


onMessageFocus(): void {
  this.isMessageLabelVisible = true;
  this.hideSubmitFeedback();
}

onMessageBlur(): void {
  if (!this.contactData.message) {
    this.isMessageLabelVisible = false;
  }
  this.checkMessageValidation();
}

checkMessageValidation(){
  this.messageChecked = true;

  const messageFieldValue = this.contactData.message;
    if (messageFieldValue && messageFieldValue.trim().length >= 1) {
      this.isMessageValid = true;
    } else {
      this.isMessageValid = false;
    }


}

onMessageInput(event: any): void {
  this.messageChecked = false;
  if (event.target.value) {
    this.isMessageLabelVisible = true;
  } else {
    this.isMessageLabelVisible = false;
  }
  this.checkMessageValidation();
}




checkPolicyValidation(){
  
  this.policyChecked = true;
}

onPolicyChange(event: Event): void {
  this.policyChecked = false;
}



checkAllValidation(){
this.checkPolicyValidation();
this.checkNameValidation();
this.nameChecked = true;
this.checkEmailValidation();
this.emailChecked = true;
this.checkMessageValidation();
this.messageChecked=true;
}



isFormValid(contactForm: any): boolean {
  return contactForm.valid && this.policyAccepted && this.isNameValid && this.isEmailValid && this.isMessageValid;
}

onSubmit(ngForm: NgForm) {
  if(this.isFormValid(ngForm)){
  if (ngForm.submitted && ngForm.form.valid && !this.mailTest ) {
    this.http.post(this.post.endPoint, this.post.body(this.contactData))
      .subscribe({
        next: (response) => {

          ngForm.resetForm();
          this.resetCustomLabels();
        },
        error: (error) => {
          console.error(error);
          this.negativeFeedback();
        },
        complete: () => { 
          console.info('send post complete')
          this.positiveFeedback();
        },
      });
  } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {

    ngForm.resetForm();
  }
}
}

positiveFeedback(){
  this.feedbackText = this.feedbackSuccess;
  this.isFeedbackSuccess = true;
  this.showSubmitFeedback();
}

negativeFeedback(){
  this.feedbackText = this.feedbackFail;
  this.isFeedbackSuccess = false;
  this.showSubmitFeedback();
}

showSubmitFeedback(){
  this.isSubmitFeedbackVisible = true;
}

hideSubmitFeedback(){
  this.isSubmitFeedbackVisible = false;
  this.isFeedbackSuccess = false;
}

resetCustomLabels(){
  this.policyChecked = false;
  this.nameChecked = false;
  this.emailChecked = false;
  this.messageChecked = false;
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
    this.policyLink ='Datenschutz';

    
    this.inputNameLabel = 'Ihr Name';
  this.inputEmailLabel = 'Ihre E-Mail';
  this.inputMessageLabel = 'Ihre Nachricht';
  this.requiredTextName = 'Ihr Name ist erforderlich';
  this.requiredTextEmail ='Ihre E-Mail ist erforderlich';
  this.requiredTextMessage='Ihre Nachricht ist leer';
  this.requiredTextPrivacy='Bitte stimmen Sie der Datenschutzerklärung zu';

  this.feedbackSuccess = 'Nachricht wurde gesendet';
  this.feedbackFail = 'Das hat nicht funktioniert';
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
    this.policyLink = 'privacy';


    this.inputNameLabel = 'Your name';
  this.inputEmailLabel = 'Your email';
  this.inputMessageLabel = 'Your message';
  this.requiredTextName = 'Your name is required';
  this.requiredTextEmail ='Your email is required';
  this.requiredTextMessage='Your message is empty';
  this.requiredTextPrivacy='Please accept the privacy policy'
  this.feedbackSuccess = 'Message sent';
  this.feedbackFail = 'Something went wrong';
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
    this.policyLink = 'privacy';

    
    this.inputNameLabel = 'Your name';
  this.inputEmailLabel = 'Your email';
  this.inputMessageLabel = 'Your message';
  this.requiredTextName = 'Your name is required';
  this.requiredTextEmail ='Your email is required';
  this.requiredTextMessage='Your message is empty';
  this.requiredTextPrivacy='Please accept the privacy policy';
  this.feedbackSuccess = 'Message sent';
  this.feedbackFail = 'Something went wrong';
  }
}




}
