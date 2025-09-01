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
}
