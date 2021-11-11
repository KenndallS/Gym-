import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AlertService, AlertIcon } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  // Icons
  faSignInAlt = faSignInAlt;
  
  loginForm: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  login(): void {
    if(this.loginForm.valid){
      let user = this.loginForm.value;
      this.authService.login(user.user, user.password).subscribe(request => {
        if(request.status === 'OK'){
          this.storageService.add('user', request.data)
          this.alertService.showNotification(AlertIcon.SUCCESS, 'Usuario autenticado');
          this.router.navigate(['home']);
        } else {
          this.alertService.showAlert(AlertIcon.WARNING, 'Error de autenticación', 'Usuario o contraseña incorrectos');
        }
      }, error => {
        this.alertService.showAlert(AlertIcon.ERROR, 'Error', this.alertService.mapError(error));
      })
    } else {
      this.alertService.showNotification(AlertIcon.WARNING, 'Debe completar todos los campos');
    }
  }

}
