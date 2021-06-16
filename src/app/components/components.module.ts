import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { IncreasingComponent } from './increasing/increasing.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';


@NgModule({
  declarations: [
    IncreasingComponent,
    DoughnutComponent
  ],
  exports: [
    IncreasingComponent,
    DoughnutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
