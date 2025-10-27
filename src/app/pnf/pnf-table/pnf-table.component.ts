import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IPNF } from '../../models/pnf.model';
import { PnfService } from '../../service/pnf.service';

@Component({
  selector: 'app-pnf-table',
  templateUrl: './pnf-table.component.html',
  styleUrl: './pnf-table.component.css'
})
export class PnfTableComponent {

  totalPages: number = 1;
  
  @Input() searchTerm: string = ''; // Recibe el término de búsqueda
  pnf: IPNF[] = []
  docenteelected: IPNF = new IPNF() ;
  @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectedDelete: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  eventoParaElPadre: EventEmitter<string> = new EventEmitter<string>();

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual
    constructor(
      private pnfService: PnfService,
      private cdr: ChangeDetectorRef  
    ){} 
  ngOnInit() {
      
    this.refresh();
  }
    refresh(){

    console.log("refresh PnfTableComponent")
    this.pnfService.consultarPNF((rows:any[]) => {
      this.pnf = rows;
      console.log(this.pnf);
      
      this.calcularTotalPaginas();
      this.cdr.detectChanges();
    });
  }
  calcularTotalPaginas() {
    this.totalPages = Math.ceil(this.pnf.length / this.itemsPerPage);
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.cdr.detectChanges();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.cdr.detectChanges();
  }
  
  getEntidadesPaginaActual(): IPNF[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pnf.slice(startIndex, endIndex);
  }

  editarpnf(PNF: any) {
    //this.PNFs = this.PNFs.filter(u => u.cedula !== PNF.cedula);
    console.log("Editar user");
    this.onRowSelect(PNF);
  }

  deletepnf(PNF: any) {
    //this.docentes = this.docentes.filter(u => u.cedula !== docente.cedula);
    console.log("onRowSelectDelete user", PNF);
    const respuesta = confirm("¿Estás seguro de que quieres realizar esta acción?");
      
      if (respuesta) {
        // El usuario hizo clic en ACEPTAR (Sí)
        alert("¡Acción confirmada!");
        
       console.log("onRowSelectDelete user", PNF);
       this.pnfService.deletePNF(PNF.id).subscribe({
          next: (response) => {
            // El registro fue guardado exitosamente
            console.log('deletepnf con ID:', response);
            this.refresh();
            this.cdr.detectChanges();
          },
          error: (err) => {
            // Hubo un error al guardar el registro
            console.error('Error al guardar:', err);
          }
        });
      } else {
        // El usuario hizo clic en CANCELAR (No)
        alert("Acción cancelada.");
      }
  }
  onRowSelect(event: any): void {
    console.log("onRowSelect", event)
    this.onSelected.next(event);
  }
  onRowSelectDelete(event: any): void {
    console.log("onRowSelect", event)
    this.onSelectedDelete.next(event);
  }
  
  notificarCrearDocente() {
    // 3. Emitir el evento (opcionalmente puedes enviar datos)
    this.eventoParaElPadre.emit();
  }
}
