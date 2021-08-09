import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medic } from '../models/medic.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicService {

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

  loadMedics() {
    const url = `${base_url}/medics`;
    return this.http.get(url, this.headers).pipe(
      map((res: {ok: boolean, medics: Medic[]}) => res.medics)
    );
  }

  createMedic(medic: Medic) {
    const url = `${base_url}/medics`;
    return this.http.post(url, medic, this.headers).pipe(
      map((res: {ok: boolean, newMedic: Medic}) => res)
    );
  }

  updateMedic(medic: Medic) {
    const url = `${base_url}/medics/${medic._id}`;
    return this.http.put(url, medic, this.headers);
  }

  deleteMedic(_id: string) {
    const url = `${base_url}/medics/${_id}`;
    return this.http.delete(url, this.headers).pipe(
      map((res: { ok: boolean, msg: string }) => res)
    );
  }

   getMedicById(_id: string) {
    const url = `${base_url}/medics/${_id}`;
    return this.http.get(url, this.headers).pipe(
      map((res: { ok: boolean, medic: Medic }) => res)
    );
  }
}
