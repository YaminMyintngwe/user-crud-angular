import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  { path: '',   redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserComponent, children: [
    { path: '', component: UserListComponent},
    { path: ':id', component: UserEditComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
