import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { Inscription } from 'src/app/models/inscription';
import { TrainingPlan } from 'src/app/models/training-plan';
import { CustomerService } from 'src/app/services/customer.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { TrainingPlanService } from 'src/app/services/training-plan.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  searchForm: FormGroup;
  customers: Customer[];
  trainingPlans: TrainingPlan[];
  inscription?: Inscription;
  customerForm: FormGroup;
  customerModalRef!: NgbModalRef;

  @ViewChild("customer_modal")
  customerModal!: ElementRef;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private trainingPlanService: TrainingPlanService,
    private inscriptionService: InscriptionService,
    private config: NgbModalConfig, 
    private modalService: NgbModal
  ) { 
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.customers = [];
    this.trainingPlans = [];
    this.inscription = undefined;
    this.customerForm = this.formBuilder.group({
      Id: [0],
      Inscription: [null],
      Card: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Gender: ['', Validators.required],
      Birthday: [datePipe.transform(new Date(), 'yyyy-MM-dd')],
      Status: ['A', Validators.required],
      TrainingPlan: ['']
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadTrainingPlans();
  }

  resetForm(){
    this.customerForm = this.formBuilder.group({
      Id: [0],
      Inscription: [null],
      Card: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Gender: ['', Validators.required],
      Birthday: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')],
      Status: ['A', Validators.required],
      TrainingPlan: ['']
    });
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

  loadTrainingPlans(){
    this.trainingPlanService.all().subscribe(request => {
      if(request.status === 'OK'){
        this.trainingPlans = request.data.filter(x => x.Status != 'I');
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
    this.resetForm();
    this.customerModalRef = this.modalService.open(content);
  }

  editCustomer(content: any, customer: Customer){
    if(customer){
      this.inscriptionService.getByCustomerId(customer.Id).subscribe(request => {
        if(request.status === 'OK'){
          this.inscription = request.data;
          console.log(this.inscription);
        } else {
          alert(request.error); // ALERT
        }
        this.customerForm.patchValue({
          ...customer, 
          Birthday: this.datePipe.transform(customer.Birthday, 'yyyy-MM-dd'), 
          TrainingPlan: this.inscription?.TrainingPlan
        });
      }, error => {
        console.log(error); // ALERT
      });
    }
    this.customerModalRef = this.modalService.open(content);
  }

  saveCustomer(){
    if(!this.customerForm.valid) return; // ALERT

    if(this.customerForm.controls["TrainingPlan"].value && this.customerForm.controls["TrainingPlan"].value > 0){
      if(!this.inscription){
        this.inscription = {
          Id: 0,
          TrainingPlan: this.customerForm.controls["TrainingPlan"].value,
          InscriptionDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
          PaymentDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? ''
        };
      } else {
        this.inscription.TrainingPlan = this.customerForm.controls["TrainingPlan"].value;
      }
      this.inscriptionService.save(this.inscription).subscribe(request => {
        if(request.status === 'OK'){
          if(request.data.insertId) this.customerForm.controls["Inscription"].setValue(request.data.insertId);

          let user = this.customerForm.value;

          // Eliminamos campo innecesario
          delete user.TrainingPlan;

          this.customerService.save(user).subscribe(request => {
            if(request.status === 'OK'){
              this.customerModalRef.close();
              this.inscription = undefined;
              this.filterCustomers(); // ALERT
            } else {
              alert(request.error); // ALERT
            }
          }, error => {
              console.log(error); // ALERT
          });
        } else {
          alert(request.error); // ALERT
        }
      }, error => {
          console.log(error); // ALERT
      });
    } else {
      let user = this.customerForm.value;

      // Eliminamos campo innecesario
      delete user.TrainingPlan;

      this.customerService.save(user).subscribe(request => {
        if(request.status === 'OK'){
          this.customerModalRef.close();
          this.inscription = undefined;
          this.filterCustomers(); // ALERT
        } else {
          alert(request.error); // ALERT
        }
      }, error => {
          console.log(error); // ALERT
      });
    }
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
