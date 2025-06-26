export class Case {

   id: number;
   nro_expediente: string;
   movil_afectado: string;
   subtipo_irregularidad: string;
   duracion: number;
   deteccion: string;
   conclusiones: string;
   fecha_inicio: string;
   tipo_caso: string;
   objetivo: string;
   modus_operandi: string;
   diagnostico: string;
   observacion: string;
   investigador: number;
   //investigador: number;
   tipo_irregularidad: string;
   incidencia: string;
   area_apoyo: string;
   estado: string;
   soporte: string;
   nombre: string;
   cedula: string;
 
  constructor( 
  ) {
      this.id= 0,
      this.nro_expediente= "",
      this.movil_afectado= "",
      this.subtipo_irregularidad= "",
      this.objetivo= "",
      this.modus_operandi= "",
      this.area_apoyo= "",
      this.fecha_inicio= "",
      this.tipo_caso= "",
      this.objetivo= "",
      this.deteccion= "",
      this.diagnostico= "",
      this.investigador= 0,
      this.tipo_irregularidad= "",
      this.incidencia= "",
      this.estado= "",
      this.soporte= "",
      this.conclusiones="",
      this.observacion="",
      this.nombre="",
      this.cedula="",
      this.duracion= 0

    }

    static fromObject(color: Case): Case{
      let obj = new Case();
      obj.id = color.id;
      obj.nro_expediente = color.nro_expediente;
      obj.movil_afectado = color.movil_afectado;
      obj.subtipo_irregularidad = color.subtipo_irregularidad;
      obj.objetivo = color.objetivo;
      obj.modus_operandi = color.modus_operandi;
      obj.area_apoyo = color.area_apoyo;
      obj.fecha_inicio = color.fecha_inicio;
      obj.tipo_caso = color.tipo_caso;
      obj.deteccion = color.deteccion;
      obj.diagnostico = color.diagnostico;
      obj.observacion = color.observacion;
      obj.tipo_irregularidad = color.tipo_irregularidad;
      obj.incidencia = color.incidencia;
      obj.investigador = color.investigador;
      obj.estado = color.estado;
      obj.soporte = color.soporte;
      obj.conclusiones = color.conclusiones;
      obj.duracion = color.duracion;
      obj.nombre = color.nombre;
      obj.cedula = color.cedula;
      return obj;
  }

    
  }