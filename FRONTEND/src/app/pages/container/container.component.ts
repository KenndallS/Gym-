import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  // ES NECESARIO REDEFINIRLO CON UN SERVICIO
  path: { link: string, name: string };

  constructor(
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { 
    this.path = {
      link: 'home',
      name: 'INICIO'
    };
  }

  ngOnInit(): void {
    this.path.link = this.router.url;
    this.path.name = this.router.url.replace('/', '').toUpperCase();
  }

  toggleMenu(event: any): void{
    event.preventDefault();
    $("#wrapper").toggleClass("toggled");
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login'])
  }
}
