import { Component} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  public value1 = 5;
  public value2 = 5;

  get getProgress1() {
    return `${this.value1}%`
  }

  get getProgress2() {
    return `${this.value2}%`
  }

  changeValue1(value: number) {
    this.value1 = value;
  }

  changeValue2(value: number) {
    this.value2 = value
  }
}
