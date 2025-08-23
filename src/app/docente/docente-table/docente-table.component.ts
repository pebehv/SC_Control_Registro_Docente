import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { DocenteService } from '../../service/docente.service';
import { CommonModule } from '@angular/common';
import { IDocente } from '../../models/docente.model';
///import { DxPaginationModule } from 'devextreme-angular';
 
@Component({
  selector: 'app-docente-table',
 // standalone: true,
 // imports: [CommonModule],
  templateUrl: './docente-table.component.html',
  styleUrl: './docente-table.component.css'
})
export class DocenteTableComponent {
    
  totalPages: number = 1;

  @Input() searchTerm: string = ''; // Recibe el término de búsqueda
  docente: IDocente[] = []
  docenteelected: IDocente = new IDocente() ;
  @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual

  constructor(
    private docenteService: DocenteService,
    private cdr: ChangeDetectorRef  
  ){} 

  ngOnInit() {
      
      this.refresh();
  }
  refresh(){

    console.log("refresh DocenteTableComponent")
    this.docenteService.consultarDocente((rows:any[]) => {
      this.docente = rows;
      console.log(this.docente);
      
      this.calcularTotalPaginas();
      this.cdr.detectChanges();
    });
  }
  
  onRowSelect(event: any): void {
    console.log("onRowSelect", event)
    this.onSelected.next(event);
  }
  editarDocente(Docente: any) {
    //this.Docentes = this.Docentes.filter(u => u.cedula !== Docente.cedula);
    console.log("Editar user");
    this.onRowSelect(Docente);
  }

  // Función para agregar un nuevo Docente
  agregarDocente(nuevoDocente: any) {
    this.docente.push(nuevoDocente);
  }
  calcularTotalPaginas() {
    this.totalPages = Math.ceil(this.docente.length / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.cdr.detectChanges();
  }

  // Método para cambiar a la página siguiente
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.cdr.detectChanges();
  }
  getEntidadesPaginaActual(): IDocente[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.docente.slice(startIndex, endIndex);
  }
}
