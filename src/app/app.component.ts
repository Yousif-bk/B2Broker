
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PseudoSocketService } from './Services/pseudoSocket.service';
import { FrequencyData } from './utils/FrequencyData';
import { plainToClass } from 'class-transformer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  clearInterval: any;
  frequencyData: any;
  interval: any;
  subscription: Subscription;
  /* Forms */
  pseudoSocketFormGroup: FormGroup;

  pseudoSocketFormValue: {
    timer: any
    size: any
    ids:any
  }

  constructor(private formBuilder: FormBuilder,
    private pseudoSocketService: PseudoSocketService) { }


  ngOnInit(): void {
    this.initForm();
    this.pseudoSocket();
    this.pseudoSocketService.setIds();
  }

  initForm() {
    this.pseudoSocketFormGroup = this.formBuilder.group({
      timer: [null],
      sizeOfData: [null],
      ids: [null]
    })
    this.handlChange();
  }

  // handle value change
  handlChange() {
    this.pseudoSocketFormGroup.valueChanges.subscribe((value) => {
      this.pseudoSocketFormValue = {
        timer: value.timer,
        size: value.sizeOfData,
        ids: value.ids
      }
      this.pseudoSocketService.setPseudoSocketFormValue.next(this.pseudoSocketFormValue);
      console.log(this.pseudoSocketFormValue)
    })
  }

  // Generate amount of hight frequecy data
  pseudoSocket() {
    this.subscription = this.pseudoSocketService.getPseudoSocketFormValue().subscribe(value => {
      if (value.timer && value.size) {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          this.initWorker(value.size)
        }, value.timer);
      } else {
        clearInterval(this.interval);
        this.initWorker(value.size)
      }

    })
  }

  // init Worker
  initWorker(sizeOfdata: number) {

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

// check obj keys


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
