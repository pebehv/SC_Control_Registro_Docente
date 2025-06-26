export interface Archivo {
    id_archivo: string;
    tipo: string;
    descripcion: string;
  }
  
  export class SerialEquiposRobados implements Archivo {
    constructor(
      public id_archivo: string,
      public caso: string,
      public tipo: string,
      public descripcion: string,
      public serial: string,
      public tipoEquipo: string,
      public modelo: string,
      public observaciones: string
    ) {}
  }
  
  export class Amonestado implements Archivo {
    constructor(
      public id_archivo: string,
      public caso: string,
      public tipo: string,
      public descripcion: string,
      public cedula: number,
      public nombre: string,
      public apellido: string,
      public empresa: string
    ) {}
  }
  
  // Factoría para crear instancias de Archivo
  export class ArchivoFactory {
    static crearArchivo(tipo: string, datos: any): Archivo {
      switch (tipo) {
        case 'SerialEquiposRobados':
          return new SerialEquiposRobados(
            datos.id_archivo,
            datos.caso,
            datos.tipo,
            datos.descripcion,
            datos.serial,
            datos.tipoEquipo,
            datos.modelo,
            datos.observaciones
          );
        case 'Amonestado':
          return new Amonestado(
            datos.id_archivo,
            datos.caso,
            datos.tipo,
            datos.descripcion,
            datos.cedula,
            datos.nombre,
            datos.apellido,
            datos.empresa
          );
        default:
          throw new Error('Tipo de archivo no soportado');
      }
    }
  }