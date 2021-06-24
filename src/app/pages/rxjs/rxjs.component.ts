import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    //metodo retry que sirve para indicarle las veces que se quiere que se vuelva a ejecutar si ocurre un error
    // this.returnObservable().pipe(retry(1)
    // ).subscribe(
    //   valor => console.log('subs:', valor),
    //   (err) => console.warn('Error', err),
    //   () => console.info('Obs terminado')
    // )

     this.intervalSubs = this.returnInterval().subscribe(console.log)
  }
  
  //destruimos el observable porque en este caso si cambiamos de pestaña igualmente se sigue ejecutando
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }



  /**
   * ejemplo de take, map
   * en este ejemplo retorna intervalos secuenciales 1,2,3,4... en este ejemplo
   * utilizamos el take para decirle que solamente llegue hasta la iteracion 4 y 
   * el map funciona para obtener el valor y realizarle alguna modificacion,
   * el FILTER sirve para determinar si se quiere emitir un valor o no de manera condicional
   * @returns 
   */
  returnInterval(): Observable<number> {
    return interval(200).pipe(
       take(10),map(value => value + 1),filter( value => ( value % 2 === 0) ? true : false)
    );
  }
  /**
   * ejemplo de un metodo que retorna un Observable
   * el cual se esta llamando en el constructor 
   * @returns 
   */
  returnObservable(): Observable<number>{
    let i = -1;
    
    return new Observable<number>(observer => {
        
      const interval = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval)
          observer.complete();
        }

        if (i == 2) {
          observer.error('i llego al valor de 2');
        }

      }, 1000)
    });

  }
}
