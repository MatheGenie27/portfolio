import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  Host,
} from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Utility } from './contact.utility';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, OnDestroy {
  @ViewChild('contactContainer', { static: false })
  contactContainer!: ElementRef;
  private scrollSubscription!: Subscription;

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
  };

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

  utility: Utility;

  currentLanguage: string = 'en';

  header = 'Contact';
  text =
    'Contact me through this form. I am excited to hear from you, learn about your ideas, and contribute to your projects with my skills and dedication.';
  catch = 'Got a problem to solve?';
  callToAction = 'Need a Frontend Developer?';
  callToAction2 = 'Contact me!';

  inputNamePlaceholder = 'Your name...';
  inputEmailPlaceholder = 'Your email...';
  inputMessagePlaceholder = 'write something...';
  privaceLabel1 = "I've read the";
  privacyLinkText = 'privacy policy';
  privacyLabel2 = 'and agree to the processing of my data as outlined';
  buttonText = 'Say hello ;)';

  policyLink = 'privacy';

  inputNameLabel = 'Your name';
  inputEmailLabel = 'Your email';
  inputMessageLabel = 'Your message';
  requiredTextName = 'Your name is required';
  requiredTextEmail = 'Your email is required';
  requiredTextMessage = 'Your message is empty';
  requiredTextPrivacy = 'Please accept the privacy policy';

  feedbackText = 'Message sent';
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

  constructor(
    private scrollService: ScrollService,
    private languageService: LanguageService
  ) {
    this.utility = new Utility(this);
  }

  /**
   * inititates Component
   */
  ngOnInit() {
    this.initiatesScrolling();
    this.initiatesLanguage();
  }

  /**
   * initialesScrolling
   */
  initiatesScrolling() {
    this.scrollSubscription = this.scrollService.scrollToContact$.subscribe(
      () => {
        if (this.contactContainer) {
          this.contactContainer.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        } else {
          console.error('contactContainer is not available.');
        }
      }
    );
  }

  /**initiates Languages in the Component */
  initiatesLanguage() {
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
      this.utility.updateTexts();
    });
  }

  /**
   * destroys a subscription to avoid memory leaks
   */
  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

  /**
   * changesLanguage to a new Language
   * @param newLanguage {string}
   */
  changeLanguage(newLanguage: string) {
    this.languageService.setLanguage(newLanguage);
  }

  /**
   * handles focussing on the input field
   */
  onMessageFocus(): void {
    this.isMessageLabelVisible = true;
    this.utility.hideSubmitFeedback();
  }

  /**
   * handles blurring the input field
   */
  onMessageBlur(): void {
    if (!this.contactData.message) {
      this.isMessageLabelVisible = false;
    }
    this.checkMessageValidation();
  }

  /**
   * validates the vaue of the message Input Field
   */
  checkMessageValidation() {
    this.messageChecked = true;

    const messageFieldValue = this.contactData.message;
    if (messageFieldValue && messageFieldValue.trim().length >= 1) {
      this.isMessageValid = true;
    } else {
      this.isMessageValid = false;
    }
  }

  /**
   * handles every input event in the input field
   * @param event
   */
  onMessageInput(event: any): void {
    this.messageChecked = false;
    if (event.target.value) {
      this.isMessageLabelVisible = true;
    } else {
      this.isMessageLabelVisible = false;
    }
    this.checkMessageValidation();
  }

  /**
   * marks policy validation as checked
   */
  checkPolicyValidation() {
    this.policyChecked = true;
  }

  /**
   * every change event leads to a required new policyCheck
   * @param event
   */
  onPolicyChange(event: Event): void {
    this.policyChecked = false;
  }

  /**
   * all inputs are validated
   */
  checkAllValidation() {
    this.checkPolicyValidation();
    this.utility.checkNameValidation();
    this.nameChecked = true;
    this.utility.checkEmailValidation();
    this.emailChecked = true;
    this.checkMessageValidation();
    this.messageChecked = true;
  }

  /**
   * validates the given ContactForm
   * @param contactForm
   * @returns {boolean}
   */
  isFormValid(contactForm: any): boolean {
    return (
      contactForm.valid &&
      this.policyAccepted &&
      this.isNameValid &&
      this.isEmailValid &&
      this.isMessageValid
    );
  }

  /**
   * submits the given ContactForm
   * @param ngForm
   */
  onSubmit(ngForm: NgForm) {
    if (this.isFormValid(ngForm)) {
      if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
        this.http
          .post(this.post.endPoint, this.post.body(this.contactData))
          .subscribe({
            next: (response) => {
              ngForm.resetForm();
              this.utility.resetCustomLabels();
            },
            error: (error) => {
              console.error(error);
              this.utility.negativeFeedback();
            },
            complete: () => {
              this.utility.positiveFeedback();
            },
          });
      } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
        ngForm.resetForm();
      }
    }
  }
}
