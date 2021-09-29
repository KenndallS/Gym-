import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RecoverFormComponent } from './components/recover-form/recover-form.component';
import { ContainerComponent } from './pages/container/container.component';
import { HealthConditionComponent } from './pages/health-condition/health-condition.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { TrainingPlanComponent } from './pages/training-plan/training-plan.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, children: [
    {path: '', component: LoginFormComponent},
    {path: 'recover', component: RecoverFormComponent}
  ]},
  {path: '', component: ContainerComponent, children: [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'users', component: UserComponent},
    {path: 'health-conditions', component: HealthConditionComponent},
    {path: 'payments', component: PaymentComponent},
    {path: 'taining-plans', component: TrainingPlanComponent},
    {path: 'logout', redirectTo: '/login', pathMatch: 'full'}
  ]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
