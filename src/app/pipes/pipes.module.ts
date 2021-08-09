import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { YesnoPipe } from './yesno.pipe';


@NgModule({
  declarations: [
    ImagePipe,
    YesnoPipe
  ],
  exports: [
    ImagePipe,
    YesnoPipe
  ]
})
export class PipesModule { }
