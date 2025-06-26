import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IEntidad } from '../models/entidad.model';

@Injectable({
  providedIn: 'root'
})
export class EntidadBdService {

  private entidadesSubject = new Subject<any[]>();

  constructor() { }

  // Método para insertar una entidad
  public insertarEntidad(
    tipo_brecha: string,
    tipo_proyecto: string,
    procesos_corregidos: string,
    procesos_realizados: string,
    investigadores: string,
    empresas: string,
    subtipo_ficha: string,
    tipo_irregularidad: string,
    subtipo_irregularidad: string,
    procedencia_casos: string
  ) {
    console.log("Insertando entidad...");
    (window as any).entidadesAPI.insertarEntidad(
      tipo_brecha,
      tipo_proyecto,
      procesos_corregidos,
      procesos_realizados,
      investigadores,
      empresas,
      subtipo_ficha,
      tipo_irregularidad,
      subtipo_irregularidad,
      procedencia_casos
    );

    // Escuchar la respuesta de la inserción
    (window as any).entidadesAPI.onEntidadInsertada((event: any, response: any) => {
      if (response.error) {
        console.error('Error al insertar entidad:', response.error);
      } else {
        console.log('Entidad insertada con ID:', response.id);
      }
    });
  }

  // Método para consultar todas las entidades
  public consultarEntidades(): Observable<IEntidad[]> {
    console.log("Consultando entidades...");
    (window as any).entidadesAPI.consultarEntidades();

    // Escuchar la respuesta de la consulta
    (window as any).entidadesAPI.onEntidadesConsultadas((event: any, response: any) => {
      if (response.error) {
        console.error('Error al consultar entidades:', response.error);
        this.entidadesSubject.next([]); // Enviar un array vacío en caso de error
      } else {
        console.log('Entidades consultadas:', response.entidades);
        this.entidadesSubject.next(response.entidades); // Enviar las entidades al observable
      }
    });

    return this.entidadesSubject.asObservable();
  }


  public actualizarEntidad(
    id: number, // Identificador único de la entidad
    tipo_brecha: string,
    tipo_proyecto: string,
    procesos_corregidos: string,
    procesos_realizados: string,
    investigadores: string,
    empresas: string,
    subtipo_ficha: string,
    tipo_irregularidad: string,
    subtipo_irregularidad: string,
    procedencia_casos: string
  ) {
    console.log("Actualizando entidad con ID desde service:", id);
    (window as any).entidadesAPI.actualizarEntidad(
      id,
      tipo_brecha,
      tipo_proyecto,
      procesos_corregidos,
      procesos_realizados,
      investigadores,
      empresas,
      subtipo_ficha,
      tipo_irregularidad,
      subtipo_irregularidad,
      procedencia_casos
    );

    // Escuchar la respuesta de la actualización
    (window as any).entidadesAPI.onEntidadActualizada((event: any, response: any) => {
      if (response.error) {
        console.error('Error al actualizar entidad:', response.error);
      } else {
        console.log('Entidad actualizada con éxito:', response);
      }
    });
  }




}