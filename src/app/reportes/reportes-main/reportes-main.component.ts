import { Component } from '@angular/core';
import { SidenavComponent } from '../../side-nav/side-nav.component';
import { ReportesTableComponent } from '../reportes-table/reportes-table.component';
import { ReportesFormComponent } from '../reportes-form/reportes-form.component';

@Component({
  selector: 'app-reportes-main',
  standalone: true,
  imports: [SidenavComponent, ReportesTableComponent, ReportesFormComponent],
  templateUrl: './reportes-main.component.html',
  styleUrl: './reportes-main.component.css'
})
export class ReportesMainComponent {

}
