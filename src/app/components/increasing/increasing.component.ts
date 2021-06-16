import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styles: [
  ]
})
export class IncreasingComponent implements OnInit {
 
  ngOnInit() {
      this.btnClass = `btn ${ this.btnClass }`
  }

  @Input() valueProgress = 0;
  @Input() btnClass = "btn-primary"
  
  @Output() outputValue = new EventEmitter();

  changeValue(param: number) {

    if (this.valueProgress >= 100 && param >= 0) {
         this.outputValue.emit(this.valueProgress = 100)
    }
    if (this.valueProgress <= 0 && param <= 0) {
        this.outputValue.emit(this.valueProgress = 0)
    }
    this.outputValue.emit(this.valueProgress = this.valueProgress + param)
  } 

  onChange(value: number) {

    if (value >= 100) {
      this.valueProgress = 100
    } else if (value <= 0) {
      this.valueProgress = 0
    } else {
       this.valueProgress = value
    }
    this.outputValue.emit(value)
  
  }
}
