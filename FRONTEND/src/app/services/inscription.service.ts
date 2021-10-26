import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../common/configuration';
import { Inscription } from '../models/inscription';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  all(): Observable<Response<Inscription[]>>{
    let url = `${Configuration.api}/inscription/all`;
    return this.http.get<Response<Inscription[]>>(url);
  }

  filter(filter: string): Observable<Response<Inscription[]>>{
    let url = `${Configuration.api}/inscription/filter/${filter}`;
    return this.http.get<Response<Inscription[]>>(url);
  }

  get(id: number): Observable<Response<Inscription>>{
    let url = `${Configuration.api}/inscription/id/${id}`;
    return this.http.get<Response<Inscription>>(url);
  }

  getByUserId(id: number): Observable<Response<Inscription>>{
    let url = `${Configuration.api}/inscription/customer/${id}`;
    return this.http.get<Response<Inscription>>(url);
  }

  save(trainingPlan: Inscription): Observable<Response<any>>{
    let url = `${Configuration.api}/inscription/save`;
    return this.http.post<Response<any>>(url, trainingPlan);
  }

  delete(id: number, status: string): Observable<Response<Inscription>>{
    let url = `${Configuration.api}/inscription/delete/${id}/${status}`;
    return this.http.delete<Response<Inscription>>(url);
  }
}
