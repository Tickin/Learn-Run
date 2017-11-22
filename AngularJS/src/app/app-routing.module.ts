import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { ScreenComponent } from './screen/screen.component'
import { VmManageComponent } from './vm-manage/vm-manage.component';
import { VdiComponent } from './vdi/vdi.component';
import { LectureClassComponent } from './lecture-class/lecture-class.component';
import { SignupComponent } from './signup/signup.component';

import { VersionFlowComponent } from './version-flow/version-flow.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'screen', component: ScreenComponent },
  { path: 'usermanage', component: UserManageComponent },
  { path: 'vmManage/:id', component: VmManageComponent },
  { path: 'vdi', component: VdiComponent },
  { path: 'lecture', component: LectureClassComponent },
  { path: 'lecture/vcs', component: VersionFlowComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
