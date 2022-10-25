import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFrequencyData } from './utils/IFrequencyData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {

   clearInterval:any;
   frequencyData: IFrequencyData[] = [];

    /* Forms */
    pseudoSocketFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder){}


  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.pseudoSocketFormGroup = this.formBuilder.group({
      timer: [null],
      arraySize:[null]
    })

    this.pseudoSocketFormControls['timer'].valueChanges.subscribe((timer) =>{
      this.pseudoSocketFormControls['timer'].setValue(timer)
    })

   this.pseudoSocketFormControls['arraySize'].valueChanges.subscribe((size) =>{
    let timervalue = this.pseudoSocketFormControls['timer'].value
    this.clearInterval = setInterval(() => {
      this.initWorker(size);
    }, timervalue);
   })
  }

  get pseudoSocketFormControls(){
    return this.pseudoSocketFormGroup.controls;
  }

  // init Worker
  initWorker(sizeOfarray: number){
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
          console.log(`page got message: ${JSON.stringify(data)}`);
          this.frequencyData = data.splice(-10)
      };
      worker.postMessage(sizeOfarray);
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }



  ngOnDestroy(): void {
    clearInterval(this.clearInterval);
  }
}
