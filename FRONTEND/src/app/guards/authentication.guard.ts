import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router
  ){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user: User = this.storageService.get('user');
    console.log(user)
    if(user){
      return true
    } else {
      if(!route.firstChild?.url.find(x => x.path === 'login')){
        console.log('sesion no iniciada')
        this.router.navigate(['login']);
      }
        
      return false;
    }
  }
  
}
