import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Configuration } from '../common/configuration';
import { Response } from '../models/response'
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  login(user: string, password: string): Observable<Response<User>>{
    let url = `${Configuration.api}/auth/login`;
    let auth = { user, password };
    return this.http.post<Response<User>>(url, auth);
  }

  logout(): void{
    this.storageService.clear()
  }

}
