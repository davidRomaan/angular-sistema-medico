import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medic } from '../models/medic.model';
import { User } from '../models/user.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private http: HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  transformData(data: any[], type:string) {
    switch (type) {
      case 'usuarios':
        const users = data.map(user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid));
        return { users: users};       
      case 'hospitales':
        const hospitals = data.map(hospital => new Hospital(hospital.name, hospital._id, hospital.img, hospital.user));
        return { hospitals: hospitals };
      case 'medicos':
          const medics = data.map(medic => new Medic(medic.name,medic._id, medic.img, medic.user, medic.hospital));
        return { medic: medics };
        default:
        return [];
      
    }
  }

  search(type: 'usuarios' | 'medicos' | 'hospitales', term: string) {
    const url = `${base_url}/all/collection/${type}/${term}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((res: any) => {
        return this.transformData(res.results, type);
      })
    )
  }
}
