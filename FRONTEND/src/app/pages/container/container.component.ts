import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  // ES NECESARIO REDEFINIRLO CON UN SERVICIO
  path: { link: string, name: string };

  constructor() { 
    this.path = {
      link: 'home',
      name: 'Inicio'
    };
  }

  ngOnInit(): void {

  }

  toggleMenu(event: any): void{
    event.preventDefault();
    $("#wrapper").toggleClass("toggled");
  }
}
