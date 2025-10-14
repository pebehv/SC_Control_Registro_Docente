import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IDocente } from '../../models/docente.model';
import { DocenteService } from '../../service/docente.service';

@Component({
  selector: 'app-estruct-table',
  templateUrl: './estruct-table.component.html',
  styleUrl: './estruct-table.component.css'
})
export class EstructTableComponent {

totalPages: number = 7;

  @Input() searchTerm: string = ''; // Recibe el término de búsqueda
  docente: IDocente[] = []
  filteredDocentes: IDocente[] = []; // La lista de docentes filtrada y paginada
  filteredList: IDocente[] = []; // La lista de docentes filtrada y paginada
  docenteelected: IDocente = new IDocente() ;
  @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual
  allFilters: any = {}; // Objeto para guardar los valores de los filtros

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
      this.applyFiltersAndPaginate();
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
      //this.applyFiltersAndPaginate();
      this.getEntidadesPaginaActual();
    }
    this.cdr.detectChanges();
  }

  // Método para cambiar a la página siguiente
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      //this.applyFiltersAndPaginate();
      this.getEntidadesPaginaActual();
      
    }
    this.cdr.detectChanges();
  }
  getEntidadesPaginaActual(): IDocente[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    console.log('getEntidadesPaginaActual',this.filteredDocentes, startIndex, endIndex, this.filteredDocentes.slice(startIndex, endIndex))
    this.filteredDocentes= this.filteredList.slice(startIndex, endIndex);
    console.log('getEntidadesPaginaActual',this.filteredDocentes, startIndex, endIndex, this.filteredDocentes.slice(startIndex, endIndex))
    
    return this.filteredDocentes.slice(startIndex, endIndex);
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

  calculoEdad(fecha: any, id: number, name : string){
    if(fecha){
  
      console.log("Caculando edad", fecha, id,name )
      const fechaActual = new Date();
      const fechaInicio = new Date(fecha);
  
      // Diferencia en milisegundos
      const diferenciaEnMilisegundos = fechaActual.getTime() - fechaInicio.getTime();
      
      // Milisegundos en un año promedio (365.25 días)
      const milisegundosEnUnAnio = 1000 * 60 * 60 * 24 * 365.25;
      
      // Cálculo de los años
      const aniosTranscurridos = diferenciaEnMilisegundos / milisegundosEnUnAnio;
      
      // Mostrar el resultado
      //console.log(`Han pasado ${aniosTranscurridos.toFixed(0)} años.`);
  
      return aniosTranscurridos.toFixed(0)
    }
    return 0
  }
  // Nuevo método para manejar el cambio en los inputs de filtro
  onFilterChange(event: any, property: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Guarda el valor del filtro para cada propiedad
    //console.log("allFilters filterValue", filterValue)
    this.allFilters[property] = filterValue.toLowerCase(); 
    //console.log("allFilters", this.allFilters)
    let x = this.applyFiltersAndPaginate();
    //console.log("allFilters x", x)
  }
  // Método que aplica todos los filtros y actualiza la paginación
  applyFiltersAndPaginate() {
    let filteredList = this.docente.filter(docente => {
     // console.log("applyFiltersAndPaginate docente", docente)
    // Haz un aserto de tipo para que TypeScript confíe
    const docenteConIndice = docente as { [key: string]: any };

    for (let key in this.allFilters) {
      const filterValue = this.allFilters[key];
      //console.log("form key", key)
      if (!filterValue) {
        continue;
      }
      // Ahora puedes usar 'key' para indexar sin error
      const docValue = (docenteConIndice[key] || '').toString().toLowerCase();
      
      if (key == 'status') {
     
         if (!docValue.startsWith(filterValue) ) {
          return false;
        }
        return true;
      }
      if (!docValue.includes(filterValue) ) {
        return false;
      }
      
    }
    return true;
  });
  //console.log("applyFiltersAndPaginate filteredList", filteredList)

    // Ahora, aplica la paginación a la lista filtrada
    this.currentPage = 1; // Reinicia la página al filtrar
    this.totalPages = Math.ceil(filteredList.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredDocentes = filteredList.slice(start, end);
    this.filteredList = filteredList;
    console.log("applyFiltersAndPaginate filteredDocentes", this.filteredDocentes)
  }

  deletedocente(docente: any) {
    //this.docentes = this.docentes.filter(u => u.cedula !== docente.cedula);
    console.log("onRowSelectDelete user", docente);
     this.docenteService.deleteDocente(docente.id).subscribe({
        next: (response) => {
          // El registro fue guardado exitosamente
          console.log('deletepnf con ID:', response);
          this.deletePersona(docente.docente)
          this.deleteIMG(docente.id)
          this.refresh();
          this.cdr.detectChanges();
        },
        error: (err) => {
          // Hubo un error al guardar el registro
          console.error('Error al guardar:', err);
        }
      });
  }
  deletePersona(docente: any) {
    //this.docentes = this.docentes.filter(u => u.cedula !== docente.cedula);
    console.log("deletePersona user", docente);
     this.docenteService.deletePersona(docente).subscribe({
        next: (response) => {
          // El registro fue guardado exitosamente
          console.log('deletePersona con ID:', response);
          this.refresh();
          this.cdr.detectChanges();
        },
        error: (err) => {
          // Hubo un error al guardar el registro
          console.error('Error al guardar:', err);
        }
      });
  }
  deleteIMG(docente: any) {
    //this.docentes = this.docentes.filter(u => u.cedula !== docente.cedula);
    console.log("deleteIMG user", docente);
     this.docenteService.deleteIMG(docente).subscribe({
        next: (response) => {
          // El registro fue guardado exitosamente
          console.log('deleteIMG con ID:', response);
          this.refresh();
          this.cdr.detectChanges();
        },
        error: (err) => {
          // Hubo un error al guardar el registro
          console.error('Error al guardar:', err);
        }
      });
  }
}

