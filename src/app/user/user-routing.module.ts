import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: '',
        component: ListComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: ':id',
        component: DetailComponent
      },
      {
        path: ':id/edit',
        component: EditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
