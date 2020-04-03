import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioComponent } from './pages/usuario/usuario.component';

const routes: Routes = [
  { path: 'usuario'    , component: UsuarioComponent },
  { path: '**', redirectTo: 'usuario' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
