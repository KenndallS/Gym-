import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  searchForm: FormGroup;
  customers: Customer[];
  customerForm: FormGroup;
  customerModalRef!: NgbModalRef;

  @ViewChild("customer_modal")
  customerModal!: ElementRef;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private config: NgbModalConfig, 
    private modalService: NgbModal
  ) { 
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.customers = [];
    this.customerForm = this.formBuilder.group({
      Id: [0],
      Inscription: [null],
      Card: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      PhoneNumber: [''],
      Gender: [''],
      Birthday: [datePipe.transform(new Date(), 'yyyy-MM-dd')],
      Status: ['A', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(){
    this.customerService.all().subscribe(request => {
      if(request.status === 'OK'){
        this.customers = request.data;
      } else {
        alert(request.error); // ALERT
      }
    }, error => {
      console.log(error); // ALERT
    })
  }

  filterCustomers(){
    if(this.searchForm.value.search){
      this.customerService.filter(this.searchForm.value.search).subscribe(request => {
        if(request.status === 'OK'){
          this.customers = request.data;
        } else {
          alert(request.error); // ALERT
        }
      }, error => {
        console.log(error); // ALERT
      })
    } else {
      this.loadCustomers();
    }
  }

  newCustomer(content: any){
    this.customerForm.reset();
    this.customerModalRef = this.modalService.open(content);
  }

  editCustomer(content: any, customer: Customer){
    if(customer) this.customerForm.patchValue({...customer, Birthday: this.datePipe.transform(customer.Birthday, 'yyyy-MM-dd')});
    this.customerModalRef = this.modalService.open(content);
  }

  saveCustomer(){
    if(!this.customerForm.valid) return; // ALERT

    let user = this.customerForm.value;

    this.customerService.save(user).subscribe(request => {
      if(request.status === 'OK'){
        this.customerModalRef.close();
        this.filterCustomers(); // ALERT
      } else {
        alert(request.error); // ALERT
      }
    }, error => {
        console.log(error); // ALERT
    });
  }

  deleteCustomer(customer: Customer){
    if(customer){
      let newStatus = ((customer.Status === 'A')?'I':'A');
      this.customerService.delete(customer.Id, newStatus).subscribe(request => {
        if(request.status === 'OK'){
          this.filterCustomers();// ALERT
        } else {
          alert(request.error); // ALERT
        }
      }, error => {
        console.log(error); // ALERT
      })
    }
  }

}
