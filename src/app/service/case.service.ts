import { Injectable } from '@angular/core';
import { Case } from '../models/case.model';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  private currentCase: Case | null = null;
  private loginSubject = new Subject<Array<any>>();
  private loginSubject_avance = new Subject<Array<any>>();
  constructor() {}

  /*saveCase(caseData: Case) {
    this.currentCase = caseData;
    console.log('Caso guardado:', this.currentCase);
  }

  getCurrentCase(): Case | null {
    return this.currentCase;
  }

  clearCase() {
    this.currentCase = null;
  }

*/
  
  public insertarCaso_inv(
    
    nro_expediente :string,
    fecha_inicio   :string,
    movil_afectado   :string,
    tipo_caso   :string,
    tipo_irregularidad   :string,
    subtipo_irregularidad   :string,
    objetivo   :string,
    incidencia   :string,
    modus_operandi   :string,
    area_apoyo   :string,
    deteccion   :string,
    diagnostico   :string,
    estado   :string,
    observacion   :string,
    soporte   :string,
    investigador :number,
  ) {
    // Llama a la API expuesta
    console.log("insertar usuario");

    (window as any).caso_inv.insertarCaso_inv(
    nro_expediente,
    fecha_inicio  ,
    movil_afectado  ,
    tipo_caso  ,
    tipo_irregularidad  ,
    subtipo_irregularidad  ,
    objetivo  ,
    incidencia  ,
    modus_operandi  ,
    area_apoyo  ,
    deteccion  ,
    diagnostico  ,
    estado  ,
    observacion  ,
    soporte  ,
    investigador
    );
  }
  
  public consultarCaso_Inv(callback: (rows: Case[]) => void) {
    (window as any).caso_inv.ipcRenderer.send('consultar-caso_inv');

    (window as any).caso_inv.ipcRenderer.on('caso_inv-consultados', (event: any, arg: { error: any; data: any[]; }) => {
        if (arg.error) {
            console.error(arg.error);
        } else {
          console.log("consulta", arg)
            callback(arg.data);
        }
    });
  }
  public actualizarCasoInv(id:number,
    nro_expediente :string,
    fecha_inicio   :string,
    movil_afectado   :string,
    tipo_caso   :string,
    tipo_irregularidad   :string,
    subtipo_irregularidad   :string,
    objetivo   :string,
    incidencia   :string,
    modus_operandi   :string,
    area_apoyo   :string,
    deteccion   :string,
    diagnostico   :string,
    estado   :string,
    observacion   :string,
    soporte   :string,
    investigador :number) {
    // Llama a la API expuesta
    console.log("actualizarCasoInv", soporte);
    (window as any).caso_inv.actualizarCasoInv(id,nro_expediente, fecha_inicio,movil_afectado, tipo_caso,tipo_irregularidad, subtipo_irregularidad,objetivo,incidencia, modus_operandi, area_apoyo, deteccion, diagnostico,estado, observacion, soporte,investigador );
  }
  public actualizarCasoCerrado_Soporte(
    id:number,
    soporte   :string,
    ) {
    // Llama a la API expuesta
    console.log("actualizarCasoCerrado_Soporte", soporte);
    (window as any).caso_inv.actualizarCasoCerrado_Soporte(id,soporte );
  }


  public buscarInv(): Observable<Array<IUser>> {
  
    console.log(`buscarInv`);
      (window as any).caso_inv.buscarInv("");

      (window as any).caso_inv.ipcRenderer.on('inv-buscado', (event: any, arg: { error: any; usuarios: any; }) => {
          if (arg.error) {
              console.error(arg.error);
          } else {
            console.log(`buscar-inv`, arg);
            //this.usuariosBuscados = arg.usuarios;
            /*if (this.usuariosBuscados.length === 0) {
              console.log(`No se encontraron usuarios con el nombre "${user}".`);
              } else {
                console.log(`Usuarios encontrados:`, this.usuariosBuscados);
            }*/
           this.loginSubject.next(arg.usuarios);
          }
        });
        console.log(`buscar-inv retirn`);
    return this.loginSubject.asObservable();
  }


  public buscarCasoPorInv(user: number): Observable<Array<Case>> {
  
    console.log(`buscarCasoPorInv`);
      (window as any).caso_inv.buscarCasoPorInv(user);

      (window as any).caso_inv.ipcRenderer.on('caso_por_inv-buscado', (event: any, arg: { error: any; usuarios: any; }) => {
          if (arg.error) {
              console.error(arg.error);
          } else {
            console.log(`buscar-caso_por_inv`, arg);
            //this.usuariosBuscados = arg.usuarios;
            /*if (this.usuariosBuscados.length === 0) {
              console.log(`No se encontraron usuarios con el nombre "${user}".`);
              } else {
                console.log(`Usuarios encontrados:`, this.usuariosBuscados);
            }*/
           this.loginSubject.next(arg.usuarios);
          }
        });
        console.log(`buscar-caso_por_inv retirn`);
    return this.loginSubject.asObservable();
  }


  public insertarCaso_Avanc(
    
    casoSelected :number,
    actividades_realizadas :string,
    personas_involucradas   :string,
    monto_exp   :string,
  ) {
    // Llama a la API expuesta
    console.log("insertarCaso_Avanc");

    (window as any).caso_inv.insertarCaso_Avanc(
      casoSelected, actividades_realizadas, personas_involucradas, monto_exp
    );
  }
  public consultarCaso_Avanc(callback: (rows: Case[]) => void) {
    (window as any).caso_inv.ipcRenderer.send('consultar-avances');

    (window as any).caso_inv.ipcRenderer.on('avances-consultados', (event: any, arg: { error: any; data: any[]; }) => {
        if (arg.error) {
            console.error(arg.error);
        } else {
          console.log("consulta", arg)
            callback(arg.data);
        }
    });
  }
  public buscarCaso_Avance(caso_id: number): Observable<Array<Case>> {
  
    console.log(`buscarCaso_Avance`);
      (window as any).caso_inv.buscarCaso_Avance(caso_id);

      (window as any).caso_inv.ipcRenderer.on('avance-buscado', (event: any, arg: { error: any; data: any; }) => {
          if (arg.error) {
              console.error(arg.error);
          } else {
            console.log(`buscar-inv******`, arg);
            
            this.loginSubject_avance.next(arg.data);
          }
        });
        
        console.log(`buscar-inv******`);
    return this.loginSubject_avance.asObservable();
  }

  public actualizarCasoAvanc(id:number,
    actividades :string,
    personas   :string,
    monto_expuesto   :string) {
    // Llama a la API expuesta
    console.log("actualizarCasoAvanc", );
    (window as any).caso_inv.actualizarCasoAvanc(id,actividades, personas, monto_expuesto);
  }


  //caso cerrado
  public insertarCaso_Cerrado(
    
    casoSelected :number,
    conclusion :string,
    recomend   :string,
    observ   :string,
  ) {
    // Llama a la API expuesta
    console.log("insertarCaso_Cerrado");

    (window as any).caso_inv.insertarCaso_Cerrado(
      casoSelected, conclusion, recomend, observ
    );
  }
  public consultarCaso_Cerrado(callback: (rows: Case[]) => void) {
    (window as any).caso_inv.ipcRenderer.send('consultar-cerrar_caso');

    (window as any).caso_inv.ipcRenderer.on('cerrar_caso-consultados', (event: any, arg: { error: any; data: any[]; }) => {
        if (arg.error) {
            console.error(arg.error);
        } else {
          console.log("consulta", arg)
            callback(arg.data);
        }
    });
  }
  public buscarCaso_Cerrado(caso_id: number): Observable<Array<Case>> {
  
    console.log(`buscarCaso_Cerrado`);
      (window as any).caso_inv.buscarCaso_Cerrado(caso_id);

      (window as any).caso_inv.ipcRenderer.on('cerrar_caso-buscado', (event: any, arg: { error: any; data: any; }) => {
          if (arg.error) {
              console.error(arg.error);
          } else {
            console.log(`buscar-inv******`, arg);
            
            this.loginSubject_avance.next(arg.data);
          }
        });
        
        console.log(`buscar-inv******`);
    return this.loginSubject_avance.asObservable();
  }

  public actualizarCasoCerrado(id:number,
    conclusion :string,
    recomend   :string,
    obser   :string) {
    // Llama a la API expuesta
    console.log("actualizarCasoCerrado", );
    (window as any).caso_inv.actualizarCasoCerrado(id,conclusion, recomend, obser);
  }

}