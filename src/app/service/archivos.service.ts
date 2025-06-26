import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Archivo, Amonestado, SerialEquiposRobados } from '../models/archivosFactoryMethod.model';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  private archivosSubject = new Subject<any[]>();

  constructor() { }

  // Método para insertar un archivo genérico
  public insertarArchivo(archivo: Archivo) {
    console.log("Insertando archivo...");
    (window as any).archivosAPI.insertarArchivo(
      archivo.id_archivo,
      archivo.tipo,
      archivo.descripcion,
      (archivo as any).caso,  // Propiedad específica de algunos tipos
      (archivo as any).serial,
      (archivo as any).tipoEquipo,
      (archivo as any).modelo,
      (archivo as any).observaciones,
      (archivo as any).cedula,
      (archivo as any).nombre,
      (archivo as any).apellido,
      (archivo as any).empresa
    );

    // Escuchar respuesta de inserción
    (window as any).archivosAPI.onArchivoInsertado((event: any, response: any) => {
      if (response.error) {
        console.error('Error insertando archivo:', response.error);
      } else {
        console.log('Archivo insertado con ID:', response.id);
        this.consultarArchivos(); // Actualizar lista después de inserción
      }
    });
  }

  // Método específico para insertar Amonestado
  public insertarAmonestado(
    id_archivo: string,
    caso: string,
    tipo: string,
    descripcion: string,
    cedula: number,
    nombre: string,
    apellido: string,
    empresa: string
  ) {
    const amonestado = new Amonestado(
      id_archivo,
      caso,
      tipo,
      descripcion,
      cedula,
      nombre,
      apellido,
      empresa
    );
    this.insertarArchivo(amonestado);
  }

  // Método específico para insertar SerialEquiposRobados
  public insertarSerialEquipo(
    id_archivo: string,
    caso: string,
    tipo: string,
    descripcion: string,
    serial: string,
    tipoEquipo: string,
    modelo: string,
    observaciones: string
  ) {
    const serialEquipo = new SerialEquiposRobados(
      id_archivo,
      caso,
      tipo,
      descripcion,
      serial,
      tipoEquipo,
      modelo,
      observaciones
    );
    this.insertarArchivo(serialEquipo);
  }

  // Consultar todos los archivos
  public consultarArchivos(): Observable<any[]> {
    console.log("Consultando archivos...");
    (window as any).archivosAPI.consultarArchivos();

    (window as any).archivosAPI.onArchivosConsultados((event: any, response: any) => {
      if (response.error) {
        console.error('Error consultando archivos:', response.error);
        this.archivosSubject.next([]);
      } else {
        console.log('Archivos obtenidos:', response.archivos);
        this.archivosSubject.next(response.archivos);
      }
    });

    return this.archivosSubject.asObservable();
  }

  // Actualizar un archivo
  public actualizarArchivo(archivo: Archivo) {
    console.log("Actualizando archivo:", archivo.id_archivo);
    (window as any).archivosAPI.actualizarArchivo(
      archivo.id_archivo,
      archivo.tipo,
      archivo.descripcion,
      (archivo as any).caso,
      (archivo as any).serial,
      (archivo as any).tipoEquipo,
      (archivo as any).modelo,
      (archivo as any).observaciones,
      (archivo as any).cedula,
      (archivo as any).nombre,
      (archivo as any).apellido,
      (archivo as any).empresa
    );

    (window as any).archivosAPI.onArchivoActualizado((event: any, response: any) => {
      if (response.error) {
        console.error('Error actualizando archivo:', response.error);
      } else {
        console.log('Archivo actualizado:', response);
        this.consultarArchivos(); // Actualizar lista después de actualización
      }
    });
  }

  // Eliminar un archivo
  public eliminarArchivo(id_archivo: string) {
    console.log("Eliminando archivo:", id_archivo);
    (window as any).archivosAPI.eliminarArchivo(id_archivo);

    (window as any).archivosAPI.onArchivoEliminado((event: any, response: any) => {
      if (response.error) {
        console.error('Error eliminando archivo:', response.error);
      } else {
        console.log('Archivo eliminado:', response);
        this.consultarArchivos(); // Actualizar lista después de eliminación
      }
    });
  }

  // Método para obtener observable de archivos
  get archivos$(): Observable<any[]> {
    return this.archivosSubject.asObservable();
  }
}