import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languageSubject = new BehaviorSubject<string>('german');

  language$ = this.languageSubject.asObservable();

  setLanguage(newLanguage: string){
    this.languageSubject.next(newLanguage);
  }

  get currentLanguage(): string{
    return this.languageSubject.getValue();
  }

  constructor() { }
}
