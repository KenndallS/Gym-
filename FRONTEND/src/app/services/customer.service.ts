import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../common/configuration';
import { Customer } from '../models/customer';
import { Response } from '../models/response'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  all(): Observable<Response<Customer[]>>{
    let url = `${Configuration.api}/customer/all`;
    return this.http.get<Response<Customer[]>>(url);
  }

  filter(filter: string): Observable<Response<Customer[]>>{
    let url = `${Configuration.api}/customer/filter/${filter}`;
    return this.http.get<Response<Customer[]>>(url);
  }

  get(id: number): Observable<Response<Customer>>{
    let url = `${Configuration.api}/customer/id/${id}`;
    return this.http.get<Response<Customer>>(url);
  }

  save(customer: Customer): Observable<Response<Customer>>{
    let url = `${Configuration.api}/customer/save`;
    return this.http.post<Response<Customer>>(url, customer);
  }

  delete(id: number, status: string): Observable<Response<Customer>>{
    let url = `${Configuration.api}/customer/delete/${id}/${status}`;
    return this.http.delete<Response<Customer>>(url);
  }
}
