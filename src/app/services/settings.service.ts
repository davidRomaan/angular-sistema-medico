import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

    //obtenemos el elemento por jquery a traves del id
  private linkTheme = document.getElementById('theme');
  
  public defaultTheme = './assets/css/colors/default.css';

  constructor() {
  }
  
  getTheme() {
    var url = localStorage.getItem('theme');
    if (url) {
        this.linkTheme!.setAttribute('href', url);
    } else {
      this.linkTheme!.setAttribute('href', this.defaultTheme);
    }
  }

    /**
   * metodo que cambia el tema de la aplicacion
   * @param theme el teme que recibe por parametro
   */
     changeTheme(theme: string) {

      //construimos la url
      const url = `./assets/css/colors/${theme}.css`;
      //setteamos la url al css del index.html
      this.linkTheme!.setAttribute('href', url);
      //guardar el tema en el localStorage
       localStorage.setItem('theme', url);
       
       this.checkCurrentTheme();
  
     }
  
     checkCurrentTheme() {
      const links = document.querySelectorAll('.selector');
      
       links.forEach(elem => {
      //antes de agregar esta clase la eliminamos
      elem.classList.remove('working');

      //obtenemos el atributo del data-theme del ciclo actual: default, green, etc
      const btnTheme = elem.getAttribute('data-theme');

      //construimos la url del css
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      
      //obtenemos el link del css del tema que esta actualmente
      const currentTheme = this.linkTheme.getAttribute('href');
    
        //comparamos
      if (btnThemeUrl === currentTheme) {
          //si el tema actual es igual al tema seleccionado, entonces
          //le agregamos la clase working a la clase selector
          elem.classList.add('working');
      }
    })
  }
}
