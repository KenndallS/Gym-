import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingPlan } from '../models/training-plan';
import { Response } from '../models/response'
import { Configuration } from '../common/configuration';

@Injectable({
  providedIn: 'root'
})
export class TrainingPlanService {

  constructor(private http: HttpClient) { }

  all(): Observable<Response<TrainingPlan[]>>{
    let url = `${Configuration.api}/training-plan/all`;
    return this.http.get<Response<TrainingPlan[]>>(url);
  }

  filter(filter: string): Observable<Response<TrainingPlan[]>>{
    let url = `${Configuration.api}/training-plan/filter/${filter}`;
    return this.http.get<Response<TrainingPlan[]>>(url);
  }

  get(id: number): Observable<Response<TrainingPlan>>{
    let url = `${Configuration.api}/training-plan/id/${id}`;
    return this.http.get<Response<TrainingPlan>>(url);
  }

  save(trainingPlan: TrainingPlan): Observable<Response<TrainingPlan>>{
    let url = `${Configuration.api}/training-plan/save`;
    return this.http.post<Response<TrainingPlan>>(url, trainingPlan);
  }

  delete(id: number, status: string): Observable<Response<TrainingPlan>>{
    let url = `${Configuration.api}/training-plan/delete/${id}/${status}`;
    return this.http.delete<Response<TrainingPlan>>(url);
  }
}

