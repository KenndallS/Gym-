import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../common/configuration';
import { Payment } from '../models/payment';
import { Response } from '../models/response'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  all(): Observable<Response<Payment[]>>{
    let url = `${Configuration.api}/payment/all`;
    return this.http.get<Response<Payment[]>>(url);
  }

  filter(filter: string): Observable<Response<Payment[]>>{
    let url = `${Configuration.api}/payment/filter/${filter}`;
    return this.http.get<Response<Payment[]>>(url);
  }

  getByInscriptionId(id: number): Observable<Response<Payment[]>>{
    let url = `${Configuration.api}/payment/inscription/${id}`;
    return this.http.get<Response<Payment[]>>(url);
  }

  get(id: number): Observable<Response<Payment>>{
    let url = `${Configuration.api}/payment/id/${id}`;
    return this.http.get<Response<Payment>>(url);
  }

  save(payment: Payment): Observable<Response<Payment>>{
    let url = `${Configuration.api}/payment/save`;
    return this.http.post<Response<Payment>>(url, payment);
  }

  delete(id: number, status: string): Observable<Response<Payment>>{
    let url = `${Configuration.api}/payment/delete/${id}/${status}`;
    return this.http.delete<Response<Payment>>(url);
  }
}
