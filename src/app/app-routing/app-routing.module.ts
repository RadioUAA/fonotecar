import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from '../pages/log-in/log-in.component';
import { BdCrudComponent } from '../pages/bd-crud/bd-crud.component';
import { ConsultasComponent } from '../pages/consultas/consultas.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [

{ path: "Login", component: LogInComponent, pathMatch: "full" },
{ path: "Consultas", component: ConsultasComponent, pathMatch: "full" },
{ path: "BaseDatos", component: BdCrudComponent, pathMatch: "full", canActivate: [AuthGuard] },
{ path: "**",  pathMatch: "full", redirectTo: "Login" }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
