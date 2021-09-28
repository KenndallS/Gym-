import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RecoverFormComponent } from './components/recover-form/recover-form.component';
import { UserComponent } from './pages/user/user.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { HealthConditionComponent } from './pages/health-condition/health-condition.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { TrainingPlanComponent } from './pages/training-plan/training-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginFormComponent,
    RecoverFormComponent,
    UserComponent,
    CustomerComponent,
    HealthConditionComponent,
    PaymentComponent,
    TrainingPlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
