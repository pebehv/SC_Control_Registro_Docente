import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioBdService } from '../service/usuario-bd.service';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent {
  @Input() searchTerm: string = ''; // Recibe el término de búsqueda
  usuarios: IUser[] = [];
  totalPages: number = 1;
  usuarioSelected: IUser = new IUser;
  @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();

  /*usuarios = [
    { cedula: '12.323.456', nombre: 'Pedro Pérez', correo: 'pseirog@sci.com', rol: 'Admin' },
    { cedula: '12.345.678', nombre: 'Juan Martinez', correo: 'jmartinez@sci.com', rol: 'investigador' },
    { cedula: '13.000.000', nombre: 'Rodrigo López', correo: 'rlopez@sci.com', rol: 'investigador' },
    { cedula: '12.365.777', nombre: 'Hector Gonzalez', correo: 'hgonzalez@sci.com', rol: 'investigador' },
    { cedula: '15.888.999', nombre: 'Ricardo Gomez', correo: 'rgomez@sci.com', rol: 'Admin' },
    { cedula: '16.555.555', nombre: 'Juan Lopez', correo: 'jpqez@sci.com', rol: 'investigador' },
    { cedula: '18.222.222', nombre: 'María Gonzalez', correo: 'mgonzalez@sci.com', rol: 'investigador' },
    { cedula: '15.123.456', nombre: 'Daniela Rodríguez', correo: 'drodriguez@sci.com', rol: 'investigador' },
    { cedula: '16.333.222', nombre: 'Carmen Pérez', correo: 'cpeirez@sci.com', rol: 'investigador' },
    { cedula: '14.555.222', nombre: 'Luis Aporte', correo: 'laponte@sci.com', rol: 'investigador' }
  ];*/

  itemsPerPage: number = 8; // Número de elementos por página
  currentPage: number = 1; // Página actual

  constructor(private usuarioBdService: UsuarioBdService,
    private cdr: ChangeDetectorRef  
  ) {} 

  ngOnInit() {
    this.refresh();

  }

  refresh(){

    console.log("refresh")
    this.usuarioBdService.consultarUsuarios((rows) => {
      this.usuarios = rows;
      console.log(this.usuarios);
      this.calcularTotalPaginas();
      this.cdr.detectChanges();
    });
  }
  

  onRowSelect(event: any): void {
    console.log("onRowSelect", event)
    this.onSelected.next(event);
  }
  // Filtra los usuarios en función del término de búsqueda
  /*get filteredUsuarios() {
    if (!this.searchTerm) {
      return this.usuarios;
    }
    return this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      usuario.cedula.includes(this.searchTerm) ||
      usuario.correo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      usuario.rol.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }*/

  // Obtiene los usuarios paginados
  /*get paginatedUsuarios() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsuarios.slice(startIndex, endIndex);
  }

  // Calcula el número total de páginas
  get totalPages() {
    return Math.ceil(this.filteredUsuarios.length / this.itemsPerPage);
  }

  // Cambia a la página siguiente
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Cambia a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }*/

  calcularTotalPaginas() {
    this.totalPages = Math.ceil(this.usuarios.length / this.itemsPerPage);
  }
  editarUsuario(usuario: any) {
    //this.usuarios = this.usuarios.filter(u => u.cedula !== usuario.cedula);
    console.log("Editar user");
    this.onRowSelect(usuario);
  }

    // Función para agregar un nuevo usuario
    agregarUsuario(nuevoUsuario: any) {
      this.usuarios.push(nuevoUsuario);
  }

  // Método para cambiar a la página anterior
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

}