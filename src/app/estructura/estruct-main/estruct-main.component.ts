import { ChangeDetectorRef, Component } from '@angular/core';
import { IDocente } from '../../models/docente.model';

@Component({
  selector: 'app-estruct-main',
  templateUrl: './estruct-main.component.html',
  styleUrl: './estruct-main.component.css'
})
export class EstructMainComponent {
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
    //
    console.log("click");
  }

  // Función para volver a la tabla
  hideAddDocenteForm() {
    this.showAddDocente = false;
    this.dataSelected = new IDocente();
    this.cdr.detectChanges();
  }

  ondataSelected($event: any){   
    this.showAddDocente = true;
    this.dataSelected = $event;
    this.cdr.detectChanges();
  }
}
