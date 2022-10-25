import { Component, Input, OnInit } from '@angular/core';
import { IChild } from '../utils/IFrequencyData';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input() childData: IChild = {
    id: '',
    color: ''
  }
  constructor() { }

  ngOnInit(): void {
  }

}
