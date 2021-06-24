import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(){

    // const promise = new Promise((resolve, reject) => {
    //   if (true) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Algo salio mal');
    //   }
    // });
    
    // promise.then((msje) => {
    //   console.log(msje);
    // }).catch(error => console.log('Error en la promesa', error));

    // console.log('Fin del Init');

    this.getUsuarios().then(data => console.log(data));
  }

  /**
   * ejemplo usando promesa de manera mas sencilla 
   * @returns 
   */
  getUsuarios(){
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users?page=2').then(resp => resp.json()).then(body => resolve(body.data));
     })   
  }
}
