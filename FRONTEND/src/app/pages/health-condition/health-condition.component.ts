import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCheck, faEdit, faPlus, faSave, faSearch, faTimes, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { HealthCondition } from 'src/app/models/health-condition';
import { AlertService } from 'src/app/services/alert.service';
import { CustomerService } from 'src/app/services/customer.service';
import { HealthConditionService } from 'src/app/services/health-condition.service';

@Component({
  selector: 'app-health-condition',
  templateUrl: './health-condition.component.html',
  styleUrls: ['./health-condition.component.scss']
})
export class HealthConditionComponent implements OnInit {
  // Icons
  faPlus = faPlus;
  faSearch = faSearch;
  faEdit = faEdit;
  faTimes = faTimes;
  faCheck = faCheck;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faSave = faSave;

  searchForm: FormGroup;
  healthConditions: HealthCondition[];
  customer?: Customer;
  healthConditionForm: FormGroup;
  healthConditionModalRef!: NgbModalRef;

  @ViewChild("modal_health_condition")
  healthConditionModal!: ElementRef;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private healthConditionService: HealthConditionService,
    private customerService: CustomerService,
    private config: NgbModalConfig, 
    private modalService: NgbModal,
    private alertService: AlertService
  ) { 
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.healthConditions = [];
    this.customer = undefined;
    this.healthConditionForm = this.formBuilder.group({
      Id: [0],
      Customer: [null],
      Height: [0],
      Weight: [0],
      FatAverage: [0],
      MuscleAverage: [0],
      IMC: [0],
      MetabolicAge: [0],
      Details: [''],
      Date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      Status: ['A', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  resetForm(){
    this.healthConditionForm = this.formBuilder.group({
      Id: [0],
      Customer: [null],
      Height: [0],
      Weight: [0],
      FatAverage: [0],
      MuscleAverage: [0],
      IMC: [0],
      MetabolicAge: [0],
      Details: [''],
      Date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      Status: ['A', Validators.required]
    });
  }

  findHealthConditions(){
    if(this.searchForm.value.search){
      this.customerService.getByCard(this.searchForm.value.search).subscribe(request => {
        if(request.status === 'OK'){
          this.customer = request.data;
          if(this.customer){
            this.healthConditionService.getByCustomerId(this.customer.Id).subscribe(request => {
              if(request.status === 'OK'){
                this.healthConditions = request.data;
              } else {
                this.healthConditions = [];
                alert(request.error); // ALERT
              }
            }, error => {
              this.healthConditions = [];
              console.log(error); // ALERT
            })
          } else {
            alert('No existe el cliente'); // ALERT
          }
        } else {
          this.healthConditions = [];
          alert(request.error); // ALERT
        }
      }, error => {
        this.healthConditions = [];
        console.log(error); // ALERT
      });
    } else {
      this.healthConditions = [];
    }
  }

  newHealthCondition(content: any){
    this.resetForm();
    this.healthConditionModalRef = this.modalService.open(content);
  }

  editHealthCondition(content: any, healthCondition: HealthCondition){
    if(healthCondition) this.healthConditionForm.patchValue({
      ...healthCondition,
      Date: this.datePipe.transform(healthCondition.Date, 'yyyy-MM-dd'), 
    });
    this.healthConditionModalRef = this.modalService.open(content);
  }

  saveHealthCondition(){
    if(!this.healthConditionForm.valid) return; // ALERT

    let healthCondition = this.healthConditionForm.value;
    healthCondition.Customer = (this.customer)?this.customer?.Id:null;

    this.healthConditionService.save(healthCondition).subscribe(request => {
      if(request.status === 'OK'){
        this.healthConditionModalRef.close();
        this.findHealthConditions(); // ALERT
      } else {
        alert(request.error); // ALERT
      }
    }, error => {
        console.log(error); // ALERT
    });
  }

  deleteHealthCondition(healthCondition: HealthCondition){
    if(healthCondition){
      let newStatus = ((healthCondition.Status === 'A')?'I':'A');
      this.healthConditionService.delete(healthCondition.Id, newStatus).subscribe(request => {
        if(request.status === 'OK'){
          this.findHealthConditions();// ALERT
        } else {
          alert(request.error); // ALERT
        }
      }, error => {
        console.log(error); // ALERT
      })
    }
  }

}
