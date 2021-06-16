import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent  {


  @Input() title = "Sin titulo"

  @Input() labels: Label[] = ['Label1', 'Label2', 'Label3']
  @Input() data: MultiDataSet = [
    [350, 450, 100]
  ];

  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
  ]
}
