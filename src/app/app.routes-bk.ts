import { Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersMainComponent } from './users-main/users-main.component';
import { LoginComponent } from './login/login.component';
import { ReportesMainComponent } from './reportes/reportes-main/reportes-main.component';
import { DocenteMainComponent } from './docente/docente-main/docente-main.component';



export const routes: Routes = [
    { path: 'usuarios', component: UsersMainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reportes', component: ReportesMainComponent },
    { path: 'docentes', component: DocenteMainComponent },

    { path: '', redirectTo: '/login', pathMatch: 'full' },



];
