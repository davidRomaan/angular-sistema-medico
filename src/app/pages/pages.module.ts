import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';


import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenances/users/users.component';

import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { MedicsComponent } from './maintenances/medics/medics.component';
import { MedicComponent } from './maintenances/medics/medic/medic.component';



@NgModule({
  declarations: [
    PagesComponent,
    ProgressComponent,
    Grafica1Component,
    DashboardComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    MedicsComponent,
    MedicComponent,
  ],
  exports: [
    PagesComponent,
    ProgressComponent,
    Grafica1Component,
    DashboardComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule
  ],
})
export class PagesModule { }
