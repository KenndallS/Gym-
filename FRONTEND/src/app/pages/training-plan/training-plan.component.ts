import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCheck, faEdit, faPlus, faSave, faSearch, faTimes, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TrainingPlan } from 'src/app/models/training-plan';
import { AlertIcon, AlertService } from 'src/app/services/alert.service';
import { TrainingPlanService } from 'src/app/services/training-plan.service';

@Component({
  selector: 'app-training-plan',
  templateUrl: './training-plan.component.html',
  styleUrls: ['./training-plan.component.scss']
})
export class TrainingPlanComponent implements OnInit {
  // Icons
  faPlus = faPlus;
  faSearch = faSearch ;
  faEdit = faEdit;
  faTimes = faTimes;
  faCheck = faCheck;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faSave = faSave;

  searchForm: FormGroup;
  trainingPlans: TrainingPlan[];
  trainingPlanForm: FormGroup;
  trainingPlanModalRef!: NgbModalRef;

  @ViewChild("training_plan_modal")
  customerModal!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private trainingPlanService: TrainingPlanService,
    private config: NgbModalConfig, 
    private modalService: NgbModal,
    private alertService: AlertService
  ) { 
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.trainingPlans = [];
    this.trainingPlanForm = this.formBuilder.group({
      Id: [0],
      Cost: [0, Validators.required],
      Name: ['', Validators.required],
      Details: [''],
      Status: ['A', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTrainingPlans();
  }

  resetForm(){
    this.trainingPlanForm = this.formBuilder.group({
      Id: [0],
      Cost: [0, Validators.required],
      Name: ['', Validators.required],
      Details: [''],
      Status: ['A', Validators.required]
    });
  }

  loadTrainingPlans(){
    this.trainingPlanService.all().subscribe(request => {
      if(request.status === 'OK'){
        this.trainingPlans = request.data;
      } else {
        this.alertService.showNotification(AlertIcon.ERROR, request.error);
      }
    }, error => {
      this.alertService.showAlert(AlertIcon.ERROR, 'Error', this.alertService.mapError(error));
    })
  }

  filterTrainingPlans(){
    if(this.searchForm.value.search){
      this.trainingPlanService.filter(this.searchForm.value.search).subscribe(request => {
        if(request.status === 'OK'){
          this.trainingPlans = request.data;
        } else {
          this.alertService.showNotification(AlertIcon.ERROR, request.error);
        }
      }, error => {
        this.alertService.showAlert(AlertIcon.ERROR, 'Error', this.alertService.mapError(error));
      })
    } else {
      this.loadTrainingPlans();
    }
  }

  newTrainingPlan(content: any){
    this.resetForm();
    this.trainingPlanModalRef = this.modalService.open(content);
  }

  editTrainingPlan(content: any, trainingPlan: TrainingPlan){
    if(trainingPlan) this.trainingPlanForm.patchValue({...trainingPlan});
    this.trainingPlanModalRef = this.modalService.open(content);
  }

  saveTrainingPlan(){
    if(!this.trainingPlanForm.valid){
      this.alertService.showNotification(AlertIcon.WARNING, 'Formulario no válido!');
      return;
    }

    let trainingPlan = this.trainingPlanForm.value;

    this.trainingPlanService.save(trainingPlan).subscribe(request => {
      if(request.status === 'OK'){
        this.trainingPlanModalRef.close();
        this.filterTrainingPlans();
        this.alertService.showNotification(AlertIcon.SUCCESS, 'Plan de entrenamiento guardado exitosamente!');
      } else {
        this.alertService.showNotification(AlertIcon.ERROR, request.error);
      }
    }, error => {
      this.alertService.showAlert(AlertIcon.ERROR, 'Error', this.alertService.mapError(error));
    });
  }

  deleteTrainingPlan(trainingPlan: TrainingPlan){
    if(trainingPlan){
      let newStatus = ((trainingPlan.Status === 'A')?'I':'A');
      this.trainingPlanService.delete(trainingPlan.Id, newStatus).subscribe(request => {
        if(request.status === 'OK'){
          this.filterTrainingPlans();
          this.alertService.showNotification(AlertIcon.SUCCESS, 'Plan de entrenamiento deshabilitado');
        } else {
          this.alertService.showNotification(AlertIcon.ERROR, request.error);
        }
      }, error => {
        this.alertService.showAlert(AlertIcon.ERROR, 'Error', this.alertService.mapError(error));
      })
    }
  }
}
