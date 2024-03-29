import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  
  transform(img: string, type: 'users'|'medics'|'hospitals'): string {
    if (!img) {
      return `${base_url}/upload/users/no-image-found.png`;
    }else if (img.includes('https')) {
        return img;
    }else if (img) {
      return `${base_url}/upload/${type}/${img}`;
    } else {
      return `${base_url}/upload/users/no-image-found.png`;
    }
  }

}
