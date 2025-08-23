import { ChangeDetectorRef, Component } from '@angular/core';
import { SidenavComponent } from '../../side-nav/side-nav.component';
import { DocenteTableComponent } from '../docente-table/docente-table.component';
import { SearchComponent } from '../../search/search.component';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { DocenteAddComponent } from '../docente-add/docente-add.component';
import { IDocente } from '../../models/docente.model';

@Component({
  selector: 'app-docente-main',
 // standalone: true,
  
  //imports: [],
  templateUrl: './docente-main.component.html',
  styleUrl: './docente-main.component.css'
})
export class DocenteMainComponent {
  showAddDocente = false; // Variable de estado para controlar la visibilidad
  dataSelected: IDocente = new IDocente() ;
  searchTerm: string = '';

  constructor(
    //private usuarioBdService: UsuarioBdService,
      private cdr: ChangeDetectorRef  
    ) {} 

  showAddDocenteForm() {
    this.dataSelected = new IDocente;
    this.showAddDocente = true;
    this.cdr.detectChanges();
    console.log("click");
  }
  // Función para manejar la búsqueda (si es necesario)
  onSearch(query: string) {
    console.log('Búsqueda:', query);
    // Aquí puedes agregar la lógica de búsqueda
  }

  // Función para volver a la tabla
  hideAddDocenteForm() {
    this.showAddDocente = false;
    this.cdr.detectChanges();
  }

  ondataSelected($event: any){
    console.log('Usuario seleccionado:', $event);
   
    this.showAddDocente = true;
    this.dataSelected = $event;
    this.cdr.detectChanges();
  }
}
