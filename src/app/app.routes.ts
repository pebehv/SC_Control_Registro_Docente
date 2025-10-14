

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersMainComponent } from './users-main/users-main.component';
import { PnfMainComponent } from './pnf/pnf-main/pnf-main.component';

export const routes: Routes = [
  {
    path: 'docentes',
    loadChildren: () => import('./docente/docente/docente.module').then(m => m.DocenteModule)
  },
  {
    path: 'estructura',
    loadChildren: () => import('./estructura/estructura.module').then(m => m.EstructuraModule)
  },
  {
    path: 'pnf',
    loadChildren: () => import('./pnf/pnf/pnf.module').then(m => m.PnfModule)
  },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsersMainComponent },
  //{ path: 'pnf', component: PnfMainComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }, 
  { path: '', redirectTo: '/docentes', pathMatch: 'full' },

];