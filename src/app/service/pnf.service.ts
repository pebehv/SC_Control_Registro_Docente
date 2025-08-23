import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PnfService {

  constructor() { }

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
}

