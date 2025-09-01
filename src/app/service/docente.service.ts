import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

declare var window: any;
@Injectable({
  providedIn: 'root'
})
// Declara la interfaz de Electron 
export class DocenteService {
  
  private loginSubject = new Subject<boolean>();
  private loginSubject_array = new Subject<any[]>();
  private loginSubject_id = new Subject<number>();
  constructor(private ngZone: NgZone) {
    // Escuchar la respuesta de Electron
    /*window.docenteAPI.onPersonaInsertado((response: any) => {
      // Manejar la respuesta dentro de la zona de Angular
      this.ngZone.run(() => {
        // Aquí podrías emitir a un Subject o hacer algo con la respuesta
        // Por simplicidad, este ejemplo solo lo registra
        console.log('Respuesta recibida en el servicio de Angular:', response);
      });
    });*/
   }

     // Método para enviar la solicitud al proceso principal de Electron
  insertarPersona(id:number, nombre: string, apellido: string,ci: number, email: string,tlf:string, 
    fechaNac:string, sexo:string): Observable<any> {
    return new Observable(observer => {
      // Envía el evento al proceso principal
      window.x.insertPersona(nombre, apellido, ci, email, tlf, 
        fechaNac, sexo);

      // Escucha la respuesta
      window.docenteAPI.onPersonaInsertado((response: any) => {
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
  
  actualizarPersona(id:number, nombre: string, apellido: string,ci: number, email: string,tlf:string, 
    fechaNac:string, sexo:string): Observable<any> {
    console.log("actualizar peersona");
    return new Observable(observer => {
      // Envía el evento al proceso principal
      window.docenteAPI.actualizarPersona(id, nombre, apellido, ci, email, tlf, fechaNac, sexo);

      // Escucha la respuesta
      (window as any).docenteAPI.ipcRenderer.on('persona-actualizada', 
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
  insertarDocente(id:number, docente: number,
    carga_acad: number,
    trayecto: number,
    sede:number,
    profesion:string,
    carga_resp:string,
    observ:string,
    estado:number): Observable<any> {
      if(id == 0){ 

        return new Observable(observer => {
          // Envía el evento al proceso principal
          window.docenteAPI.insertDocente(docente,  carga_acad, trayecto, 
            profesion,estado, sede, carga_resp,observ);
    
          // Escucha la respuesta
          window.docenteAPI.onDocenteInsertado((response: any) => {
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
      }else{
        console.log("actualizar docente");
        return new Observable(observer => {
          // Envía el evento al proceso principal
          window.docenteAPI.actualizarDocente(docente,  carga_acad, trayecto, 
            profesion,estado, sede, carga_resp,observ);
    
          // Escucha la respuesta
        (window as any).docenteAPI.ipcRenderer.on('docente-actualizada', 
          (response : any) => {
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
  public consultarPersona(callback: (rows: any[]) => void) {
      (window as any).docenteAPI.ipcRenderer.send('consultar-persona');
  
      (window as any).docenteAPI.ipcRenderer.on('pesona-consultados', (event: any, arg: { error: any; persona: any[]; }) => {
          if (arg.error) {
              console.error(arg.error);
          } else {
            //console.log("consulta", arg)
              callback(arg.persona);
          }
      });
  }
  public consultarImage(docente: number):Observable<any[]> {
      (window as any).img_api.consultarImage(docente);
  
      (window as any).img_api.ipcRenderer.on('imagen-consultados', (event: any, arg: { error: any; data: any[]; }) => {
          if (arg.error) {
              console.error(arg.error);
          } else {
            //console.log("consulta", arg)
             // callback(arg.persona);
             this.loginSubject_array.next(arg.data)
          }
      });
      return this.loginSubject_array.asObservable()
  }

  /*public insertarPersona(id:number, nombre: string, apellido: string,ci: number, email: string,tlf:string, 
    fechaNac:string, sexo:string):Observable<number>  {
    
    // Llama a la API expuesta
    if(id == 0){
      console.log("insertar persona");
      
      (window as any).docenteAPI.insertPersona(nombre, apellido, ci, email, tlf, 
        fechaNac, sexo);
      
      (window as any).docenteAPI.ipcRenderer.on('persona-insertado', 
        (event: any, arg: { error: any; idd: any; }) => {
          if (arg.error) {
              console.log('error en docnetes');
              console.error(arg.error);
          } else {
            console.log("consulta", arg)
            
            this.loginSubject_id.next(arg['idd'])
              //callback(arg.persona);
              //return arg['idd']
          }
      });
    }else{
      console.log("actualizar peersona");
      (window as any).docenteAPI.actualizarPersona(id, nombre, apellido, ci, email, tlf, fechaNac, sexo);
      //this.loginSubject_id.next(0)
      //this.loginSubject_id.next(0)
      (window as any).docenteAPI.ipcRenderer.on('persona-actualizada', 
        (event: any, arg: { error: any; idd: any; }) => {
          if (arg.error) {
              console.log('error en docnetes');
              console.error(arg.error);
          } else {
            console.log("consulta actualizar peersona", arg)
            
            this.loginSubject_id.next(arg['idd'])
              //callback(arg.persona);
              //return arg['idd']
          }
      });
    }
    
   return this.loginSubject_id.asObservable();
  }*/
  public actualizar_Persona(id:number, nombre: string, apellido: string,ci: number, email: string,tlf:string, 
    fechaNac:string, sexo:string):Observable<number>  {
    
    // Llama a la API expuesta
    /*if(id == 0){
      console.log("insertar persona");
      
      (window as any).docenteAPI.insertPersona(nombre, apellido, ci, email, tlf, 
        fechaNac, sexo);
      
      (window as any).docenteAPI.ipcRenderer.on('persona-insertado', 
        (event: any, arg: { error: any; idd: any; }) => {
          if (arg.error) {
              console.log('error en docnetes');
              console.error(arg.error);
          } else {
            console.log("consulta", arg)
            
            this.loginSubject_id.next(arg['idd'])
              //callback(arg.persona);
              //return arg['idd']
          }
      });
    }*/if(true){
      console.log("actualizar peersona");
      (window as any).docenteAPI.actualizarPersona(id, nombre, apellido, ci, email, tlf, fechaNac, sexo);
      //this.loginSubject_id.next(0)
      //this.loginSubject_id.next(0)
      
    }
    
   return this.loginSubject_id.asObservable();
  }

  /*public actualizarPersona(id:number, nombre: string, apellido: string,ci: number, email: string,tlf:string, 
    fechaNac:string, sexo:string) {
    // Llama a la API expuesta
    console.log("actualizar peersona");
      (window as any).docenteAPI.actualizarPersona(id, nombre, apellido, ci, email, tlf, fechaNac, sexo);
  }*/
  public consultarDocente(callback: (rows: any[]) => void) {
      (window as any).docenteAPI.ipcRenderer.send('consultar-docente');
  
      (window as any).docenteAPI.ipcRenderer.on('docente-consultados', (event: any, arg: { error: any; data: any[]; }) => {
          if (arg.error) {
              console.log('error en docnetes');
              console.error(arg.error);
          } else {
            console.log("consulta", arg)
              callback(arg.data);
          }
      });
  }
/*
  public insertarDocente(id:number, docente: number,
    carga_acad: number,
    trayecto: string,
    sede:string,
    profesion:string,
    estado:boolean

  ):Observable<boolean> {
    // Llama a la API expuesta
    if(id == 0){
      console.log("insertar docente");
      
      return (window as any).docenteAPI.insertDocente(docente,  carga_acad, trayecto, 
        profesion,estado);
      
      //this.loginSubject.next(true);
    }else{
      
      console.log("actualizar docente");
      (window as any).docenteAPI.actualizarDocente( docente, carga_acad, trayecto, 
        profesion,estado);

      return (window as any).docenteAPI.ipcRenderer.on('docente-actualizada', 
        (event: any, arg: { error: any; success: any; }) => {
          if (arg.error) {
              console.log('error en docnetes');
              console.error(arg.error);
          } else {
            console.log("consulta", arg)
            
            //this.loginSubject.next(arg.success)
              //callback(arg.docente);
              //return arg['idd']
          }
      });
    }
    
   //return this.loginSubject.asObservable();
  }
  */
  public insertarImg( img_id: number, tipo_mime: string, docente:number,img: any):Observable<boolean> {
    // Llama a la API expuesta
    if(img_id == 0){
      
      return new Observable(observer => {
        // Envía el evento al proceso principal
        window.img_api.insertImage(img.filename,img.filetype, img.value, docente );
        // Escucha la respuesta
        window.img_api.onImagenInsertado((response: any) => {
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
      console.log("insertar image", tipo_mime);
     // console.log("insertar image2", img.filename,img.filetype, img.value);
      (window as any).img_api.insertImage(img.filename,img.filetype, img.value, docente );
      /*(window as any).img_api.ipcRenderer.on('image-actualizada', 
        (event: any, arg: { error: any; success: any; }) => {
          if (arg.error) {
              console.log('error en docnetes');
              console.error(arg.error);
          } else {
            console.log("consulta", arg)
            
            this.loginSubject.next(arg.success)
              //callback(arg.docente);
              //return arg['idd']
          }
      });*/
      /*const response = await window.api.insertImage(filePath, imageName, mimeType);
        if (response.success) {
            alert('Imagen subida con éxito! ID: ' + response.id);
            await loadImages(); // Recargar la galería después de subir
        } else {
            alert('Error al subir la imagen: ' + response.message);
        }*/
    }/*else{
      console.log("actualizar docente");
      (window as any).myAPI.actualizarUsuario(id, nombre, apellido, ci, email, tlf, fechaNac, sexo);
  
    }*/
   else{
    console.log("actualizar image");
   
    return new Observable(observer => {
          // Envía el evento al proceso principal
      window.img_api.actualizarImage(img_id, img.value,img.filetype, img.filename, docente);
        // Escucha la respuesta
      (window as any).docenteAPI.ipcRenderer.on('image-actualizada', 
        (response : any) => {
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

    /*(window as any).img_api.ipcRenderer.on('image-actualizada', 
        (event: any, arg: { error: any; success: any; }) => {
          if (arg.error) {
              console.log('error en docnetes');
              console.error(arg.error);
          } else {
            console.log("consulta", arg)
            
            this.loginSubject.next(arg.success)
              //callback(arg.docente);
              //return arg['idd']
          }
      });*/
   }
   return this.loginSubject.asObservable();
  }
}
