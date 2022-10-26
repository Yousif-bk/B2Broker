
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PseudoSocketService } from './Services/pseudoSocket.service';
import { FrequencyData } from './utils/FrequencyData';
import { IFrequencyData } from './utils/IFrequencyData';
import { plainToClass } from 'class-transformer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
   clearInterval:any;
   frequencyData: any;
   interval: any;
   subscription: Subscription;
    /* Forms */
   pseudoSocketFormGroup: FormGroup;

    pseudoSocketFormValue:{
      timer: 0
      size: 0
     }

  constructor(private formBuilder: FormBuilder,
    private pseudoSocketService: PseudoSocketService){}


  ngOnInit(): void {
    this.initForm();
    this.pseudoSocket();
  }

  initForm(){
    this.pseudoSocketFormGroup = this.formBuilder.group({
      timer: [null],
      sizeOfData:[null]
    })
    this.handlChange();
  }

  handlChange() {
    this.pseudoSocketFormGroup.valueChanges.subscribe((value)=>{
       this.pseudoSocketFormValue = {
        timer: value.timer,
        size: value.sizeOfData
      }
      this.pseudoSocketService.setPseudoSocketFormValue.next(this.pseudoSocketFormValue);
     })
  }


  pseudoSocket(){
    this.subscription =  this.pseudoSocketService.getPseudoSocketFormValue().subscribe(value=>{
      if(value.size && value.timer){
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          this.initWorker(value.size)
        },value.timer);
      }
    })
  }


  // init Worker
  initWorker(sizeOfdata: number){

    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./webWorker/app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
          console.log(`page got message: ${JSON.stringify(data)}`)
           this.frequencyData = plainToClass(FrequencyData, data.splice(-10))
      };
      worker.postMessage(sizeOfdata);
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
