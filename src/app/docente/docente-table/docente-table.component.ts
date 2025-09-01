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

  getTrayecto( id: number){
    if(id == 1){ return 'Inicial' }
    if(id == 2){ return 'Mixto' }
    if(id == 3){ return 'Regular' }
    return ''

  }
  getStatus( id: number){
    if(id == 1){ return 'Activo' }
    if(id == 2){ return 'Inactivo' }
    if(id == 3){ return 'Por Ingresar  ' }
    return ''

  }

  getSede( id: number){
    if(id == 1){ return 'Carmen Ruiz ' }
    if(id == 2){ return 'Ciudad Miranda' }
    if(id == 3){ return 'Mixto' }
    return ''

  }

  calculoEdad(fecha: any){
    const fechaActual = new Date();
    const fechaInicio = new Date(fecha);
    //const diferenciaEnMilisegundos = fechaActual.getTime() - fechaInicio.getTime();
    console.log(fechaActual); 
    console.log(fecha); 
    // Diferencia en milisegundos
    const diferenciaEnMilisegundos = fechaActual.getTime() - fechaInicio.getTime();
    
    // Milisegundos en un año promedio (365.25 días)
    const milisegundosEnUnAnio = 1000 * 60 * 60 * 24 * 365.25;
    
    // Cálculo de los años
    const aniosTranscurridos = diferenciaEnMilisegundos / milisegundosEnUnAnio;
    
    // Mostrar el resultado
    console.log(`Han pasado ${aniosTranscurridos.toFixed(0)} años.`);
    console.log(diferenciaEnMilisegundos); 
  }
}
