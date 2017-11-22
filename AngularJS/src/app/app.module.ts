import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { VmManageComponent } from './vm-manage/vm-manage.component';
import { Compute_Instance } from './vm-manage/Compute_Instance';

import { Token } from './Token';
import { VMListService } from './data/vm-mock.service';
import { Servers } from './servers';
import { VdiToken } from './vdiToken';
import {Volume} from './volume';
import { AppRoutingModule } from './app-routing.module';
import { UserManageComponent } from './user-manage/user-manage.component';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { ScreenComponent } from './screen/screen.component';
import { VersionFlowComponent } from './version-flow/version-flow.component';

import { enableProdMode } from '@angular/core';
import { VdiComponent } from './vdi/vdi.component';
import { LectureClassComponent } from './lecture-class/lecture-class.component';
import { SignupComponent } from './signup/signup.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatNativeDateModule,MatSortModule } from '@angular/material'

@NgModule({
  declarations: [
    AppComponent,
    VmManageComponent,
    UserManageComponent,
    LoginComponent,
    ScreenComponent,
    VdiComponent,
    LectureClassComponent,
    SignupComponent,
    VersionFlowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    CdkTableModule,
    MatNativeDateModule,
    //MatSortModule,
    BrowserAnimationsModule,
  ],
  providers: [Token, Servers, VdiToken, Compute_Instance, VMListService, LoginService,Volume],
  bootstrap: [AppComponent]
})
export class AppModule { }
