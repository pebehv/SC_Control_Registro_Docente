

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersMainComponent } from './users-main/users-main.component';

export const routes: Routes = [
  {
    path: 'docentes',
    loadChildren: () => import('./docente/docente/docente.module').then(m => m.DocenteModule)
  },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsersMainComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];