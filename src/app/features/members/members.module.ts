import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './members-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MembersListComponent } from './members-list/members-list.component';

@NgModule({
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule
  ],
  declarations: [
    MembersListComponent
  ]
})
export class MembersModule { }
