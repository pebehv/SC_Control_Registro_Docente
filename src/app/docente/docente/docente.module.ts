import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocenteMainComponent } from '../docente-main/docente-main.component';
import { DocenteTableComponent } from '../docente-table/docente-table.component';
import { DocenteAddComponent } from '../docente-add/docente-add.component';
import { SidenavComponent } from '../../side-nav/side-nav.component';
import { SearchComponent } from '../../search/search.component';
import { DxPaginationModule } from 'devextreme-angular';
import  {  NgMultiSelectDropDownModule  }  from  'ng-multiselect-dropdown' ; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: DocenteMainComponent
    }
];

@NgModule({
  declarations: [DocenteMainComponent, DocenteTableComponent, DocenteAddComponent],
  imports: [
    CommonModule,
    SidenavComponent, 
    SearchComponent, 
    RouterModule, 
    NgIf, 
    DxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class DocenteModule { }
