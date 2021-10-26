import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../common/configuration';
import { HealthCondition } from '../models/health-condition';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class HealthConditionService {

  constructor(private http: HttpClient) { }

  all(): Observable<Response<HealthCondition[]>>{
    let url = `${Configuration.api}/health-condition/all`;
    return this.http.get<Response<HealthCondition[]>>(url);
  }

  filter(filter: string): Observable<Response<HealthCondition[]>>{
    let url = `${Configuration.api}/health-condition/filter/${filter}`;
    return this.http.get<Response<HealthCondition[]>>(url);
  }

  getByCustomerId(id: number): Observable<Response<HealthCondition[]>>{
    let url = `${Configuration.api}/health-condition/customer/${id}`;
    return this.http.get<Response<HealthCondition[]>>(url);
  }

  get(id: number): Observable<Response<HealthCondition>>{
    let url = `${Configuration.api}/health-condition/id/${id}`;
    return this.http.get<Response<HealthCondition>>(url);
  }

  save(customer: HealthCondition): Observable<Response<HealthCondition>>{
    let url = `${Configuration.api}/health-condition/save`;
    return this.http.post<Response<HealthCondition>>(url, customer);
  }

  delete(id: number, status: string): Observable<Response<HealthCondition>>{
    let url = `${Configuration.api}/health-condition/delete/${id}/${status}`;
    return this.http.delete<Response<HealthCondition>>(url);
  }
}
