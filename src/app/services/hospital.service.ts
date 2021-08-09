import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  loadHospitals(from: number = 0) {
    const url = `${base_url}/hospitals`;
    return this.http.get(url, this.headers).pipe(
      map((res: {ok: boolean, hospitals: Hospital[]}) => res.hospitals)
    );
  }

  createHospitals(name: string) {
    const url = `${base_url}/hospitals`;
    return this.http.post(url, { name }, this.headers).pipe(
      map((res: {ok: boolean, hospital: Hospital}) => res)
    );
  }

  updateHospitals(_id: string, name: string) {
    const url = `${base_url}/hospitals/${_id}`;
    return this.http.put(url, { name }, this.headers);
  }

  deleteHospitals(_id: string) {
    const url = `${base_url}/hospitals/${_id}`;
    return this.http.delete(url, this.headers).pipe(
      map((res: { ok: boolean, msg: string }) => res)
    );
  }
}
