import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faBacon, faBook, faCalendarAlt, faCheck, faEdit, faEye, faHeartbeat, faIdCard, faPlus, faRuler, faSave, faSearch, faThList, faTimes, faToggleOff, faToggleOn, faUser, faWeight, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { HealthCondition } from 'src/app/models/health-condition';
import { AlertIcon, AlertService } from 'src/app/services/alert.service';
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
  faUser = faUser;
  faIdCard = faIdCard;
  faEye = faEye;
  faCalendarAlt = faCalendarAlt;
  faRuler = faRuler;
  faWeight = faWeight;
  faBacon = faBacon;
  faWeightHanging = faWeightHanging;
  faHeartbeat = faHeartbeat;
  faThList = faThList;
  faBook = faBook;

  searchForm: FormGroup;
  healthConditions: HealthCondition[];
  customer?: Customer;
  healthConditionForm: FormGroup;
  healthConditionModalRef!: NgbModalRef;
  activeHealthCondition?: HealthCondition;
  viewHealthConditionModalRef!: NgbModalRef;

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
    this.activeHealthCondition = undefined;
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
                this.alertService.showNotification(AlertIcon.ERROR, request.error);
              }
            }, error => {
              this.healthConditions = [];
              this.alertService.showAlert(AlertIcon.ERROR, 'Error', this.alertService.mapError(error));
            })
          } else {
            this.alertService.showNotification(AlertIcon.INFO, 'No existe el cliente');
          }
        } else {
          this.healthConditions = [];
          this.alertService.showNotification(AlertIcon.ERROR, request.error);
        }
      }, error => {
        this.healthConditions = [];
        this.alertService.showAlert(AlertIcon.ERROR, 'Error', this.alertService.mapError(error));
      });
    } else {
      this.healthConditions = [];
    }
  }

  newHealthCondition(content: any){
    this.resetForm();
    this.healthConditionModalRef = this.modalService.open(content);
  }

  viewHealthCondition(content: any, healthCondition: HealthCondition){
    if(healthCondition) this.activeHealthCondition = healthCondition;
    this.viewHealthConditionModalRef = this.modalService.open(content);
  }

  editHealthCondition(content: any, healthCondition: HealthCondition){
    if(healthCondition) this.healthConditionForm.patchValue({
      ...healthCondition,
      Date: this.datePipe.transform(healthCondition.Date, 'yyyy-MM-dd'), 
    });
    this.healthConditionModalRef = this.modalService.open(content);
  }

  saveHealthCondition(){
    if(!this.healthConditionForm.valid){
      this.alertService.showNotification(AlertIcon.WARNING, 'Formulario no v??lido!');
      return;
    }

    let healthCondition = this.healthConditionForm.value;
    healthCondition.Customer = (this.customer)?this.customer?.Id:null;

    this.healthConditionService.save(healthCondition).subscribe(request => {
      if(request.status === 'OK'){
        this.healthConditionModalRef.close();
        this.findHealthConditions();
        this.alertService.showNotification(AlertIcon.SUCCESS, 'Condici??n de salud guardada exitosamente!');
      } else {
        this.alertService.showNotification(AlertIcon.ERROR, request.error);
      }
    }, error => {
      this.alertService.showAlert(AlertIcon.ERROR, 'Error', this.alertService.mapError(error));
    });
  }

  deleteHealthCondition(healthCondition: HealthCondition){
    if(healthCondition){
      let newStatus = ((healthCondition.Status === 'A')?'I':'A');
      this.healthConditionService.delete(healthCondition.Id, newStatus).subscribe(request => {
        if(request.status === 'OK'){
          this.alertService.showNotification(AlertIcon.SUCCESS, (healthCondition.Status === 'A')?'Condici??n de salud deshabilitada':'Condici??n de salud habilitada');
          this.findHealthConditions();
        } else {
          this.alertService.showNotification(AlertIcon.ERROR, request.error);
        }
      }, error => {
        this.alertService.showAlert(AlertIcon.ERROR, 'Error', this.alertService.mapError(error));
      })
    }
  }

}
