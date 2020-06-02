import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockAddEditComponent } from './stock-add-edit/stock-add-edit.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path : 'stock-list', component: StockListComponent },
  { path : 'stock-edit', component: StockAddEditComponent },
  { path : 'stock-edit/:id', component: StockAddEditComponent },
  { path : 'login', component: LoginComponent },
  { path : '*', pathMatch : 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
