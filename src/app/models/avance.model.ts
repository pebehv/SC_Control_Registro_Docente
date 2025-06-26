export class IAvance{

  id : number;
  actividades_realizadas: string;
  personas_involucradas: string;
  monto_exp: string;


  constructor(){
      this.id = 0;
      this.actividades_realizadas = '';
      this.personas_involucradas = '';
      this.monto_exp = '';
      
  }
  static fromObject(color: IAvance): IAvance{
      let obj = new IAvance();
      obj.id = color.id;
      obj.actividades_realizadas = color.actividades_realizadas;
      obj.personas_involucradas = color.personas_involucradas;
      obj.monto_exp = color.monto_exp;
      
      
      return obj;
  }

  /*static iniciar_session(value: number): boolean{
      return value == 0 ? false : true;
  }
  static cerrar_session(): boolean{
      return false;
  }*/
}


/*import { Case } from './case.model';


export class Avance {
    constructor(
      public avance: string,
      public fecha: string,
      public comentarios: string,
      public caso: Case
    ) {}
  }*/