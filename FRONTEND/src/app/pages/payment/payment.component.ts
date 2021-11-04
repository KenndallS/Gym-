import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { Inscription } from 'src/app/models/inscription';
import { Payment } from 'src/app/models/payment';
import { CustomerService } from 'src/app/services/customer.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  searchForm: FormGroup;
  payments: Payment[];
  customer?: Customer;
  // inscription?: Inscription;
  paymentForm: FormGroup;
  paymentModalRef!: NgbModalRef;

  @ViewChild("modal_payment")
  paymentModal!: ElementRef;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private customerService: CustomerService,
    // private inscriptionService: InscriptionService,
    private config: NgbModalConfig, 
    private modalService: NgbModal
  ) { 
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.payments = [];
    this.customer = undefined;
    // this.inscription = undefined;
    this.paymentForm = this.formBuilder.group({
      Id: [0],
      Inscription: [null],
      Amount: [0],
      PayDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      ExpirationDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      Status: ['A', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  resetForm(){
    this.paymentForm = this.formBuilder.group({
      Id: [0],
      Inscription: [null],
      Amount: [0],
      PayDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      ExpirationDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      Status: ['A', Validators.required]
    });
  }

  findPayments(){
    if(this.searchForm.value.search){
      this.customerService.getByCard(this.searchForm.value.search).subscribe(request => {
        if(request.status === 'OK'){
          this.customer = request.data;
          if(this.customer){
            this.paymentService.getByInscriptionId(this.customer.Inscription).subscribe(request => {
              if(request.status === 'OK'){
                this.payments = request.data;
              } else {
                this.payments = [];
                alert(request.error); // ALERT
              }
            }, error => {
              this.payments = [];
              console.log(error); // ALERT
            })
          } else {
            alert('No existe el cliente'); // ALERT
          }
        } else {
          this.payments = [];
          alert(request.error); // ALERT
        }
      }, error => {
        this.payments = [];
        console.log(error); // ALERT
      });
    } else {
      this.payments = [];
    }
  }

  newPayment(content: any){
    this.resetForm();
    this.paymentModalRef = this.modalService.open(content);
  }

  editPayment(content: any, payment: Payment){
    if(payment) this.paymentForm.patchValue({
      ...payment,
      PayDate: this.datePipe.transform(payment.PayDate, 'yyyy-MM-dd'), 
      ExpirationDate: this.datePipe.transform(payment.ExpirationDate, 'yyyy-MM-dd'), 
    });
    this.paymentModalRef = this.modalService.open(content);
  }

  savePayment(){
    if(!this.paymentForm.valid) return; // ALERT

    let payment = this.paymentForm.value;
    payment.Inscription = (this.customer)?this.customer?.Inscription:null;

    this.paymentService.save(payment).subscribe(request => {
      if(request.status === 'OK'){
        this.paymentModalRef.close();
        this.findPayments(); // ALERT
      } else {
        alert(request.error); // ALERT
      }
    }, error => {
        console.log(error); // ALERT
    });
  }

  deletePayment(payment: Payment){
    if(payment){
      let newStatus = ((payment.Status === 'A')?'I':'A');
      this.paymentService.delete(payment.Id, newStatus).subscribe(request => {
        if(request.status === 'OK'){
          this.findPayments();// ALERT
        } else {
          alert(request.error); // ALERT
        }
      }, error => {
        console.log(error); // ALERT
      })
    }
  }

}
