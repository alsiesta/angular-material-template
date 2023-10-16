import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { AccountPageComponent } from './account-page/account-page.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'profile', component: AccountPageComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'edit-profile', component: EditProfileComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'details', component: ProfileDetailsComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'changepassword', component: ChangePasswordComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
