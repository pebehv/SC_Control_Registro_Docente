import { ChangeDetectorRef, Component } from '@angular/core';
import { IPNF } from '../../models/pnf.model';

@Component({
  selector: 'app-pnf-main',
  templateUrl: './pnf-main.component.html',
  styleUrl: './pnf-main.component.css'
})
export class PnfMainComponent {
  showAddDocente = false;
  dataSelected: IPNF = new IPNF() ;
  searchTerm: string = '';
  
  constructor(
    //private usuarioBdService: UsuarioBdService,
      private cdr: ChangeDetectorRef  
    ) {} 

  
  showAddPNFForm() {
    //this.dataSelected = new IDocente;
    this.showAddDocente = true;
    this.cdr.detectChanges();
    console.log("click");
  }
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
