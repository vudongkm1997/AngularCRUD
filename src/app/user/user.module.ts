import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [DetailComponent, EditComponent, ListComponent, CreateComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
