import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../common/configuration';
import { Response } from '../models/response'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  all(): Observable<Response<User[]>>{
    let url = `${Configuration.api}/user/all`;
    return this.http.get<Response<User[]>>(url);
  }

  filter(filter: string): Observable<Response<User[]>>{
    let url = `${Configuration.api}/user/filter/${filter}`;
    return this.http.get<Response<User[]>>(url);
  }

  get(id: number): Observable<Response<User>>{
    let url = `${Configuration.api}/user/id/${id}`;
    return this.http.get<Response<User>>(url);
  }

  save(user: User): Observable<Response<User>>{
    let url = `${Configuration.api}/user/save`;
    return this.http.post<Response<User>>(url, user);
  }

  delete(id: number, status: string): Observable<Response<User>>{
    let url = `${Configuration.api}/user/delete/${id}/${status}`;
    return this.http.delete<Response<User>>(url);
  }
}
