import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export class Utility {
  private context: any;

  constructor(context: any) {
    this.context = context;
  }

  /**
   * handles the feedback for a positive submission
   */
  positiveFeedback() {
    this.context.feedbackText = this.context.feedbackSuccess;
    this.context.isFeedbackSuccess = true;
    this.context.showSubmitFeedback();
  }

  /**
   * handles the feedback for a negative submission
   */
  negativeFeedback() {
    this.context.feedbackText = this.context.feedbackFail;
    this.context.isFeedbackSuccess = false;
    this.showSubmitFeedback();
  }

  /**
   * shows the submit Feedback
   */
  showSubmitFeedback() {
    this.context.isSubmitFeedbackVisible = true;
  }

  /**
   * hides the submit Feedback
   */
  hideSubmitFeedback() {
    this.context.isSubmitFeedbackVisible = false;
    this.context.isFeedbackSuccess = false;
  }

  /**
   * resets all the labels in the contactform
   */
  resetCustomLabels() {
    this.context.policyChecked = false;
    this.context.nameChecked = false;
    this.context.emailChecked = false;
    this.context.messageChecked = false;
  }

  /**
   * handles thedefocussing of the submit Button
   *
   */
  buttonDeFocus() {
    setTimeout(() => {
      this.hideSubmitFeedback();
    }, 2000);
  }

  /**
   * handles focusing on the input
   */
  onNameFocus(): void {
    this.context.isNameLabelVisible = true;
    this.hideSubmitFeedback();
  }

  /**
   * handles bluring the input
   */
  onNameBlur(): void {
    if (!this.context.contactData.name) {
      this.context.isNameLabelVisible = false;
    }
    this.checkNameValidation();
  }

  /**
   * checks if input valiue is valid
   */
  checkNameValidation() {
    this.context.nameChecked = true;
    const nameFieldValue = this.context.contactData.name;
    if (nameFieldValue && nameFieldValue.trim().length >= 3) {
      this.context.isNameValid = true;
    } else {
      this.context.isNameValid = false;
    }
  }

  /**
   * handles an input event in the input label
   * @param event
   */
  onNameInput(event: any): void {
    this.context.nameChecked = false;
    if (event.target.value) {
      this.context.isNameLabelVisible = true;
      this.context.nameChecked = false;
    } else {
      this.context.isNameLabelVisible = false;
    }
    this.checkNameValidation();
  }

  /**
   * handles focusing on the input
   */
  onEmailFocus(): void {
    this.context.isEmailLabelVisible = true;
    this.hideSubmitFeedback();
  }

  /**
   * handles blurring the input
   */
  onEmailBlur(): void {
    if (!this.context.contactData.email) {
      this.context.isEmailLabelVisible = false;
    }
    this.checkEmailValidation();
  }

  /**
   * validates the vaue of the inoutfield
   */
  checkEmailValidation() {
    this.context.emailChecked = true;

    const emailFieldValue = this.context.contactData.email;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailFieldValue && emailPattern.test(emailFieldValue)) {
      this.context.isEmailValid = true;
    } else {
      this.context.isEmailValid = false;
    }
  }

  /**
   * handles input events in the inputfield
   * @param event
   */
  onEmailInput(event: any): void {
    this.context.emailChecked = false;
    if (event.target.value) {
      this.context.isEmailLabelVisible = true;
      this.context.emailChecked = false;
    } else {
      this.context.isEmailLabelVisible = false;
    }
    this.checkEmailValidation();
  }

  /**
   * changes Texts
   */
  updateTexts(): void {
    if (this.context.currentLanguage === 'de') {
      this.context.header = 'Kontakt';
      this.context.text =
        'Kontaktieren Sie mich über dieses Formular. Ich freue mich darauf, von Ihnen zu hören, mehr über Ihre Ideen zu erfahren und mit meinen Fähigkeiten und meinem Engagement zu Ihren Projekten beizutragen.';
      this.context.catch = 'Haben Sie ein Problem zu lösen?';
      this.context.callToAction = 'Brauchen Sie einen Frontend-Entwickler?';
      this.context.callToAction2 = 'Schreiben Sie mir!';

      this.context.inputNamePlaceholder = 'Ihr Name...';
      this.context.inputEmailPlaceholder = 'Ihre E-Mail...';
      this.context.inputMessagePlaceholder = 'Schreiben Sie etwas...';
      this.context.privaceLabel1 = 'Ich habe die';
      this.context.privacyLinkText = 'Datenschutzerklärung';
      this.context.privacyLabel2 =
        'gelesen und stimme der Verarbeitung meiner Daten gemäß dieser zu.';
      this.context.buttonText = 'Hallo sagen ;)';
      this.context.policyLink = 'Datenschutz';

      this.context.inputNameLabel = 'Ihr Name';
      this.context.inputEmailLabel = 'Ihre E-Mail';
      this.context.inputMessageLabel = 'Ihre Nachricht';
      this.context.requiredTextName = 'Ihr Name ist erforderlich';
      this.context.requiredTextEmail = 'Ihre E-Mail ist erforderlich';
      this.context.requiredTextMessage = 'Ihre Nachricht ist leer';
      this.context.requiredTextPrivacy =
        'Bitte stimmen Sie der Datenschutzerklärung zu';

      this.context.feedbackSuccess = 'Nachricht wurde gesendet';
      this.context.feedbackFail = 'Das hat nicht funktioniert';
    } else if (this.context.currentLanguage === 'en') {
      this.context.header = 'Contact';
      this.context.text =
        'Contact me through this form. I am excited to hear from you, learn about your ideas, and contribute to your projects with my skills and dedication.';
      this.context.catch = 'Got a problem to solve?';
      this.context.callToAction = 'Need a Frontend Developer?';
      this.context.callToAction2 = 'Contact me!';

      this.context.inputNamePlaceholder = 'Your name...';
      this.context.inputEmailPlaceholder = 'Your email...';
      this.context.inputMessagePlaceholder = 'Write something...';
      this.context.privaceLabel1 = "I've read the";
      this.context.privacyLinkText = 'privacy policy';
      this.context.privacyLabel2 =
        'and agree to the processing of my data as outlined.';
      this.context.buttonText = 'Say hello ;)';
      this.context.policyLink = 'privacy';

      this.context.inputNameLabel = 'Your name';
      this.context.inputEmailLabel = 'Your email';
      this.context.inputMessageLabel = 'Your message';
      this.context.requiredTextName = 'Your name is required';
      this.context.requiredTextEmail = 'Your email is required';
      this.context.requiredTextMessage = 'Your message is empty';
      this.context.requiredTextPrivacy = 'Please accept the privacy policy';

      this.context.feedbackSuccess = 'Message sent';
      this.context.feedbackFail = 'Something went wrong';
    } else {
      // Fallback-Sprache (optional, Englisch als Standard)
      this.context.header = 'Contact';
      this.context.text =
        'Contact me through this form. I am excited to hear from you, learn about your ideas, and contribute to your projects with my skills and dedication.';
      this.context.catch = 'Got a problem to solve?';
      this.context.callToAction = 'Need a Frontend Developer?';
      this.context.callToAction2 = 'Contact me!';

      this.context.inputNamePlaceholder = 'Your name...';
      this.context.inputEmailPlaceholder = 'Your email...';
      this.context.inputMessagePlaceholder = 'Write something...';
      this.context.privaceLabel1 = "I've read the";
      this.context.privacyLinkText = 'privacy policy';
      this.context.privacyLabel2 =
        'and agree to the processing of my data as outlined.';
      this.context.buttonText = 'Say hello ;)';
      this.context.policyLink = 'privacy';

      this.context.inputNameLabel = 'Your name';
      this.context.inputEmailLabel = 'Your email';
      this.context.inputMessageLabel = 'Your message';
      this.context.requiredTextName = 'Your name is required';
      this.context.requiredTextEmail = 'Your email is required';
      this.context.requiredTextMessage = 'Your message is empty';
      this.context.requiredTextPrivacy = 'Please accept the privacy policy';

      this.context.feedbackSuccess = 'Message sent';
      this.context.feedbackFail = 'Something went wrong';
    }
  }
}
