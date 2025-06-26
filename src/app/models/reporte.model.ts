export abstract class ReporteProduct {
    constructor(
      public id_reporte: number,
      public tipo: string,
      public fecha_generacion: Date,
      public contenido: string
    ) {}
  
    abstract generarReporte(): void;
  }
  export class ReporteEmpresas extends ReporteProduct {
    constructor(
      id_reporte: number,
      tipo: string,
      fecha_generacion: Date,
      contenido: string,
      public nroCasosRegistrados: number
    ) {
      super(id_reporte, tipo, fecha_generacion, contenido);
    }
  
    generarReporte(): void {
      console.log(`Generando Reporte de Empresas con ${this.nroCasosRegistrados} casos registrados.`);
    }
  }
  
  export class ReporteInvestigadores extends ReporteProduct {
    constructor(
      id_reporte: number,
      tipo: string,
      fecha_generacion: Date,
      contenido: string,
      public nroCasosAtendidos: number
    ) {
      super(id_reporte, tipo, fecha_generacion, contenido);
    }
  
    generarReporte(): void {
      console.log(`Generando Reporte de Investigadores con ${this.nroCasosAtendidos} casos atendidos.`);
    }
  }
  
  export class ReporteCasosRelacionados extends ReporteProduct {
    constructor(
      id_reporte: number,
      tipo: string,
      fecha_generacion: Date,
      contenido: string,
      public nroCasosRelacionados: number
    ) {
      super(id_reporte, tipo, fecha_generacion, contenido);
    }
  
    generarReporte(): void {
      console.log(`Generando Reporte de Casos Relacionados con ${this.nroCasosRelacionados} casos.`);
    }
  }

  export abstract class ReportesFactory {
    abstract generarReporte(): ReporteProduct;
  }

  export class RepEmpresasFactory extends ReportesFactory {
    generarReporte(): ReporteProduct {
      return new ReporteEmpresas(1, 'Empresas', new Date(), 'Contenido del Reporte de Empresas', 10);
    }
  }
  
  export class RepInvestigadoresFactory extends ReportesFactory {
    generarReporte(): ReporteProduct {
      return new ReporteInvestigadores(2, 'Investigadores', new Date(), 'Contenido del Reporte de Investigadores', 5);
    }
  }
  
  export class RepCasosRelacionadosFactory extends ReportesFactory {
    generarReporte(): ReporteProduct {
      return new ReporteCasosRelacionados(3, 'Casos Relacionados', new Date(), 'Contenido del Reporte de Casos Relacionados', 8);
    }
  }
  