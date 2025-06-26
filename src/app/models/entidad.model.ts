export class IEntidad {
    id: number;
    tipo_brecha: string;
    tipo_proyecto: string;
    procesos_corregidos: string;
    procesos_realizados: string;
    investigadores: string;
    empresas: string;
    subtipo_ficha: string;
    tipo_irregularidad: string;
    subtipo_irregularidad: string;
    procedencia_casos: string;
  
    constructor() {
      this.id = 0;
      this.tipo_brecha = '';
      this.tipo_proyecto = '';
      this.procesos_corregidos = '';
      this.procesos_realizados = '';
      this.investigadores = '';
      this.empresas = '';
      this.subtipo_ficha = '';
      this.tipo_irregularidad = '';
      this.subtipo_irregularidad = '';
      this.procedencia_casos = '';
    }
  
    
    static fromObject(entidad: IEntidad): IEntidad {
      const obj = new IEntidad();
      obj.id = entidad.id;
      obj.tipo_brecha = entidad.tipo_brecha;
      obj.tipo_proyecto = entidad.tipo_proyecto;
      obj.procesos_corregidos = entidad.procesos_corregidos;
      obj.procesos_realizados = entidad.procesos_realizados;
      obj.investigadores = entidad.investigadores;
      obj.empresas = entidad.empresas;
      obj.subtipo_ficha = entidad.subtipo_ficha;
      obj.tipo_irregularidad = entidad.tipo_irregularidad;
      obj.subtipo_irregularidad = entidad.subtipo_irregularidad;
      obj.procedencia_casos = entidad.procedencia_casos;
      return obj;
    }
  }