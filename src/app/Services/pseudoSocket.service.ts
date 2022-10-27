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

  setIds(){
    this.getPseudoSocketFormValue().subscribe((value) => {
      const idsToStr = value.ids.toString();
      const idsToArray = idsToStr.split(",");
      return idsToArray
    })
  }
}
