import { ChangeDetectorRef, Component } from '@angular/core';
import { SidenavComponent } from '../../side-nav/side-nav.component';
import { SearchComponent } from '../../search/search.component';
import { TableEntidadesComponent } from '../table-entidades/table-entidades.component';
import { Router, RouterModule } from '@angular/router';
import { EntidadBdService } from '../../service/entidad-bd.service';
import { AddEntidadComponent } from "../add-entidad/add-entidad.component";
import { CommonModule, NgIf } from '@angular/common';
import { IEntidad } from '../../models/entidad.model';

@Component({
  selector: 'app-entidades-main',
  standalone: true,
  imports: [SidenavComponent, SearchComponent, TableEntidadesComponent, RouterModule, AddEntidadComponent, CommonModule, NgIf],
  templateUrl: './entidades-main.component.html',
  styleUrl: './entidades-main.component.css'
})
export class EntidadesMainComponent {
  entidadSelected: IEntidad = new IEntidad;
  showAddEntidad = false;

  constructor(private router: Router, private entidadBdService : EntidadBdService, private cdr: ChangeDetectorRef ) { }

  showAddEntidadForm() {
    this.showAddEntidad = true;
  }
  hideAddEntidadForm() {
    this.showAddEntidad = false;
    this.cdr.detectChanges();
  }
  onEntidadSelected($event: IEntidad){
    console.log('Entidad seleccionada desde entidades-main:', $event);
    // Aquí puedes agregar la lógica para manejar el evento de selección del usuario
    this.showAddEntidad = true;
    this.entidadSelected = $event;
    this.cdr.detectChanges();
  }

}
