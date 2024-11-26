import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly STORAGE_KEY = "preferredLanguage";
  private languageSubject = new BehaviorSubject<string>('en');

  language$ = this.languageSubject.asObservable();

  setLanguage(newLanguage: string): void {
    if (newLanguage !== this.languageSubject.getValue()) { // Sprache nur aktualisieren, wenn sie sich ändert
      this.languageSubject.next(newLanguage); // Observable aktualisieren
      localStorage.setItem('preferredLanguage', newLanguage); // Persistenz aktualisieren
    }
  }
  
  

  get currentLanguage(): string{
    return this.languageSubject.getValue();
    
  }

  constructor() {
    const savedLanguage = localStorage.getItem(this.STORAGE_KEY);
    const validLanguage = savedLanguage === 'en' || savedLanguage === 'de' ? savedLanguage : 'en';
    this.languageSubject.next(validLanguage); // Initialisiere mit validierter Sprache
  }
  
}
