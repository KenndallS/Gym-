import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TrainingPlan } from 'src/app/models/training-plan';
import { TrainingPlanService } from 'src/app/services/training-plan.service';

@Component({
  selector: 'app-training-plan',
  templateUrl: './training-plan.component.html',
  styleUrls: ['./training-plan.component.scss']
})
export class TrainingPlanComponent implements OnInit {

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
    private modalService: NgbModal
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
        alert(request.error); // ALERT
      }
    }, error => {
      console.log(error); // ALERT
    })
  }

  filterTrainingPlans(){
    if(this.searchForm.value.search){
      this.trainingPlanService.filter(this.searchForm.value.search).subscribe(request => {
        if(request.status === 'OK'){
          this.trainingPlans = request.data;
        } else {
          alert(request.error); // ALERT
        }
      }, error => {
        console.log(error); // ALERT
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
    if(!this.trainingPlanForm.valid) return; // ALERT

    let user = this.trainingPlanForm.value;

    this.trainingPlanService.save(user).subscribe(request => {
      if(request.status === 'OK'){
        this.trainingPlanModalRef.close();
        this.filterTrainingPlans(); // ALERT
      } else {
        alert(request.error); // ALERT
      }
    }, error => {
        console.log(error); // ALERT
    });
  }

  deleteTrainingPlan(trainingPlan: TrainingPlan){
    if(trainingPlan){
      let newStatus = ((trainingPlan.Status === 'A')?'I':'A');
      this.trainingPlanService.delete(trainingPlan.Id, newStatus).subscribe(request => {
        if(request.status === 'OK'){
          this.filterTrainingPlans();// ALERT
        } else {
          alert(request.error); // ALERT
        }
      }, error => {
        console.log(error); // ALERT
      })
    }
  }
}
