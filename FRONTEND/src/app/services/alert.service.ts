import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2'

export enum AlertIcon {
  SUCCESS = 'success',
  QUESTION = 'question',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  mapError(error: any): string{
    if(typeof error === 'string') return error;
    return error.message || JSON.stringify(error) || 'Unknown error';
  }

  showAlert(type: AlertIcon, title: string, message: string): Observable<SweetAlertResult<any>>{
    let alertPromise = Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonText: 'Continuar'
    });
    return from(alertPromise);
  }

  showNotification(type: AlertIcon, message: string): Observable<SweetAlertResult<any>>{
    let notificationPromise = Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      icon: type,
      title: message
    });
    return from(notificationPromise);
  }
}
