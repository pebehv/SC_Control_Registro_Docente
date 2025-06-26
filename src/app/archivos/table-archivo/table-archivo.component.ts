import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArchivosService } from '../../service/archivos.service';
import { Amonestado, Archivo, SerialEquiposRobados } from '../../models/archivosFactoryMethod.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-archivo',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './table-archivo.component.html',
  styleUrls: ['./table-archivo.component.css']
})
export class TableArchivoComponent {
    @Output() onSelected: EventEmitter<Archivo> = new EventEmitter<Archivo>();

  archivos: Archivo[] = [];

  constructor(private archivosService: ArchivosService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.cargarArchivos();
  }
  onRowSelect(event: Archivo): void {
    console.log("Archivo seleccionado", event)
    this.onSelected.next(event);

  }
  cargarArchivos(): void {
    this.archivosService.consultarArchivos().subscribe(
      (archivos: Archivo[]) => {
        this.archivos = archivos;
        console.log("Archivo desde table:", this.archivos);
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error al cargar archivos:', error);
      }

    );
    
  }

  verArchivo(archivo: Archivo): void {
    console.log('Ver archivo:', archivo);
    //this.onRowSelect(archivo);
  
    let mensaje: string;
  
    // Verificar el tipo de archivo usando la propiedad "tipo"
    if (archivo.tipo === 'SerialEquiposRobados') {
      const archivoEspecifico = archivo as SerialEquiposRobados; // Type casting
      mensaje = `
        ID Archivo: ${archivoEspecifico.id_archivo}
        Caso: ${archivoEspecifico.caso}
        Tipo: ${archivoEspecifico.tipo}
        Descripción: ${archivoEspecifico.descripcion}
        Serial: ${archivoEspecifico.serial}
        Tipo de Equipo: ${archivoEspecifico.tipoEquipo}
        Modelo: ${archivoEspecifico.modelo}
        Observaciones: ${archivoEspecifico.observaciones}
      `;
    } else if (archivo.tipo === 'Amonestado') {
      const archivoEspecifico = archivo as Amonestado; // Type casting
      mensaje = `
        ID Archivo: ${archivoEspecifico.id_archivo}
        Caso: ${archivoEspecifico.caso}
        Tipo: ${archivoEspecifico.tipo}
        Descripción: ${archivoEspecifico.descripcion}
        Cédula: ${archivoEspecifico.cedula}
        Nombre: ${archivoEspecifico.nombre}
        Apellido: ${archivoEspecifico.apellido}
        Empresa: ${archivoEspecifico.empresa}
      `;
    } else {
      mensaje = 'Tipo de archivo no soportado';
    }
  
    // Mostrar el alert con la información del archivo
    alert(mensaje);
  }
}