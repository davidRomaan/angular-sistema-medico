import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }


  getMessage(icon, msg) {
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  getMessageError(error) {
    Swal.fire('Error',
    error,
    'error');
  };

}
