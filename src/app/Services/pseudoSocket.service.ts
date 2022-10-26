import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PseudoSocketService {
  setPseudoSocketFormValue = new Subject<any>();
  constructor() { }

  getPseudoSocketFormValue(){
    return this.setPseudoSocketFormValue;
  }
}
