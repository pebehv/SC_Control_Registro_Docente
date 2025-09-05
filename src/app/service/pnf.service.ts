import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

declare var window: any;
@Injectable({
  providedIn: 'root'
})
export class PnfService {

  constructor(private ngZone: NgZone) { }

  public consultarPNF(callback: (rows: any[]) => void) {
      (window as any).pnfAPI.ipcRenderer.send('consultar-pnf');
  
      (window as any).pnfAPI.ipcRenderer.on('pnf-consultados', (event: any, arg: { error: any; pnf: any[]; }) => {
          if (arg.error) {
              console.error(arg.error);
          } else {
            console.log("consulta", arg)
              callback(arg.pnf);
          }
      });
  }

  deletePNFDoc(docente: number): Observable<any> {
    console.log("deletePNFDoc", docente)
    return new Observable(observer => {
      // Envía el evento al proceso principal
      window.pnfAPI.deletePNFDoc(docente);

      // Escucha la respuesta
      window.pnfAPI.onPNFDocDelete((response: any) => {
        this.ngZone.run(() => {
          if (response.error) {
            observer.error(response.error);
          } else {
            console.log('service deletePNFDoc ', response)
            observer.next(response);
            
          }
          observer.complete();
        });
      });
    });
  }
  consultarPNFDoc(docente: number): Observable<any> {
    console.log("consultarPNFDoc", docente)
    //this.deletePNFDoc(docente)
    return new Observable(observer => {
      // Envía el evento al proceso principal
      window.pnfAPI.buscarPNFDoc(docente);

      // Escucha la respuesta
      window.pnfAPI.onPNFDocBuscar((response: any) => {
        this.ngZone.run(() => {
          if (response.error) {
            observer.error(response.error);
          } else {
            console.log('service consultarPNFDoc ', response)
            observer.next(response);
            
          }
          observer.complete();
        });
      });
    });
  }
  insertarPNF(nombre: string): Observable<any> {
    console.log("insertarPNF", nombre)
    return new Observable(observer => {
      // Envía el evento al proceso principal
      window.pnfAPI.insertPNF(nombre);

      // Escucha la respuesta
      window.pnfAPI.onPNFInsertado((response: any) => {
        this.ngZone.run(() => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response);
            
          }
          observer.complete();
        });
      });
    });
  }
  
  insertPNFsDoc(pnfs: any[], docente: number ): Observable<any> {
    console.log("insertarPNF", pnfs)
    return new Observable(observer => {
      // Envía el evento al proceso principal
      window.pnfAPI.insertPNFsDoc(pnfs, docente);

      // Escucha la respuesta
      window.pnfAPI.onPNFInsertado((response: any) => {
        this.ngZone.run(() => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response);
            
          }
          observer.complete();
        });
      });
    });
  }
  
  deletePNF(id: number): Observable<any> {
    console.log("deletePNF", id)
    return new Observable(observer => {
      // Envía el evento al proceso principal
      window.pnfAPI.deletePNF(id);

      // Escucha la respuesta
      window.pnfAPI.onPNFdelete((response: any) => {
        this.ngZone.run(() => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response);
          }
          observer.complete();
        });
      });
    });
  }
  
  actualizarPNF(id:number, nombre: string, activo: boolean): Observable<any> {
    console.log("actualizar pnf");
    return new Observable(observer => {
      // Envía el evento al proceso principal
      window.pnfAPI.actualizarPNF(id, nombre, activo);

      // Escucha la respuesta
      (window as any).pnfAPI.ipcRenderer.on('pnf-actualizada', 
        (response :any) => {
          this.ngZone.run(() => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response);
          }
          observer.complete();
        });
      });
    });

  }
}

