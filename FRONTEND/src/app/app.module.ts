import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserComponent } from './pages/user/user.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { HealthConditionComponent } from './pages/health-condition/health-condition.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { TrainingPlanComponent } from './pages/training-plan/training-plan.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { ContainerComponent } from './pages/container/container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginFormComponent,
    UserComponent,
    CustomerComponent,
    HealthConditionComponent,
    PaymentComponent,
    TrainingPlanComponent,
    HeaderComponent,
    LoginComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
