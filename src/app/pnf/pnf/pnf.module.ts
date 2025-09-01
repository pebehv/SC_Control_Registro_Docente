import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SidenavComponent } from '../../side-nav/side-nav.component';
import { SearchComponent } from '../../search/search.component';
import { DxPaginationModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule, Routes } from '@angular/router';
import { PnfMainComponent } from '../pnf-main/pnf-main.component';
import { PnfTableComponent } from '../pnf-table/pnf-table.component';
import { PnfAddComponent } from '../pnf-add/pnf-add.component';

const routes: Routes = [
    {
        path: '',
        component: PnfMainComponent
    }
];


@NgModule({
  declarations: [PnfMainComponent, PnfTableComponent, PnfAddComponent],
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
export class PnfModule { }
