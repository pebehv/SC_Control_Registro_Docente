import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { EstructMainComponent } from './estruct-main/estruct-main.component';
import { SidenavComponent } from '../side-nav/side-nav.component';
import { SearchComponent } from '../search/search.component';
import { DxPaginationModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EstructTableComponent } from './estruct-table/estruct-table.component';

const routes: Routes = [
    {
        path: '',
        component: EstructMainComponent
    }
];


@NgModule({
  declarations: [EstructMainComponent, EstructTableComponent],
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
export class EstructuraModule { }
