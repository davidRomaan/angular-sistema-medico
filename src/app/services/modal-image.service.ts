import { Injectable,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  public type: 'users' | 'medics' | 'hospitals'
  public id: string
  public img: string = ''

  private _hideModal: boolean = true;
  public newImg: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  } 

  openModal(type: 'users' | 'medics' | 'hospitals', id: string, img: string = 'no-img') {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${type}/${img}`;
    }

  }

  closeModal() {
    this._hideModal = true;
  }
  
  constructor() { }
}
