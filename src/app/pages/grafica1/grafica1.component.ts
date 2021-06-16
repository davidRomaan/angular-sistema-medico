import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: Label[] = ['Enero', 'Febrero', 'Marzo'];
  public data1: MultiDataSet = [
    [200, 200, 200]
  ];

  public labels2: Label[] = ['Abril', ' Mayo', 'Junio'];
  public data2: MultiDataSet = [
    [500, 200, 200]
  ];

}
