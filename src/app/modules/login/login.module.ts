import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  declarations: [LoginComponent, DashboardComponent, SideBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
