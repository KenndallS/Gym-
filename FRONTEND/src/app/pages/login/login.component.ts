import { Component, OnInit } from '@angular/core';
import { Container, IOptions, Main, RecursivePartial } from 'tsparticles';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  id = "tsparticles";
  constructor() { }

  ngOnInit(): void {
    
  }
  particlesOptions: RecursivePartial<IOptions>=
  {
    "background": {
      "color": {
        "value": "#000000"
      }
    },
    "fullScreen": {
      "zIndex": 1
    },
    "interactivity": {
      "events": {
        "onClick": {
          "enable": true,
          "mode": "push"
        },
        "onHover": {
          "enable": true,
          "mode": "repulse"
        }
      }
    },
    "particles": {
      "color": {
        "value": "#ff0000",
        "animation": {
          "h": {
            "enable": true,
            "speed": 20
          }
        }
      },
      "links": {
        "color": {
          "value": "#ffffff"
        },
        "enable": true,
        "opacity": 0.4
      },
      "move": {
        "enable": true,
        "outModes": {
          "default": "out",
          "bottom": "out",
          "left": "out",
          "right": "out",
          "top": "out"
        },
        "speed": 6
      },
      "number": {
        "density": {
          "enable": true
        },
        "value": 80
      },
      "opacity": {
        "value": 0.5
      },
      "size": {
        "value": {
          "min": 0.1,
          "max": 3
        }
      }
    }
  };

  particlesLoaded(container: Container): void {
      console.log(container);
  }

  particlesInit(main: Main): void {
      console.log(main);

      // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
  }

}