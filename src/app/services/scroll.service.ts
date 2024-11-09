import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ScrollService {

  private scrollToContactSubject = new Subject<void>();

  scrollToContact$ = this.scrollToContactSubject.asObservable();

  triggerScrollContact(){
    this.scrollToContactSubject.next();
  }

  constructor() { }
}
