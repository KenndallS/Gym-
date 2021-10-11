import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  add(key: string, value: any): void{
    let json = JSON.stringify(value);
    localStorage.setItem(key, json);
  }

  get(key: string): any{
    let json = localStorage.getItem(key) || '';
    let obj = JSON.parse(json);
    return obj || null;
  }

  clear(){
    localStorage.clear();
  }
}
