import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { TuristaComponent } from './turista/turista.component';
import { CRUDAEComponent } from './crud-ae/crud-ae.component';
import { CreateAdminComponent } from './crear-admin/create-admin.component';

const routes: Routes = [

  { path: '', redirectTo: '/turista', pathMatch: 'full' }, 
  { path: 'turista', component: TuristaComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },

    //PANEL ADMIN
    { path: 'panel-admin', component: CRUDAEComponent, children: [
      { path: 'crear-usuario', component: CreateAdminComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
