import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioBdService {

  usuarios: IUser[] = [];
  private currentUserRole: number | null = null;
  private currentUserUser: number | null = null;
  private loginSubject = new Subject<boolean>();
  constructor() { }

  public insertarUsuario(nombre: string, apellido: string,ci: number, email: string,user:string, password:string, rol:number) {
    // Llama a la API expuesta
    console.log("insertar usuario");
    (window as any).myAPI.insertUser(nombre,apellido,ci, email,user, password, rol);
  }

  public actualizarUsuario(id:number, nombre: string, apellido: string,ci: number, email: string,user:string, password:string, rol:number) {
    // Llama a la API expuesta
    console.log("actualizarUsuario");
    (window as any).myAPI.actualizarUsuario(id, nombre, apellido,ci, email,user, password, rol);
  }
  public consultarUsuarios(callback: (rows: IUser[]) => void) {
    (window as any).myAPI.ipcRenderer.send('consultar-usuarios');

    (window as any).myAPI.ipcRenderer.on('usuarios-consultados', (event: any, arg: { error: any; usuarios: any[]; }) => {
        if (arg.error) {
            console.error(arg.error);
        } else {
          console.log("consulta", arg)
            callback(arg.usuarios);
        }
    });
  }
  
 /* public eliminarUsuario(id: number) {
    (window as any).myAPI.eliminarUsuario(id); 
  }*/
  /*public buscarUser(user: string) {
    return (window as any).myAPI.buscarUser(user); 
  }*/

  public buscarUser(user: string) {
    if (user) {
        (window as any).myAPI.buscarUser(user);

        (window as any).myAPI.ipcRenderer.on('usuario-buscado', (event: any, arg: { error: any; usuarios: any; }) => {
            if (arg.error) {
                console.error(arg.error);
            } else {
              console.log(`Usuarios encontrados:`, arg);
                
            }
        });
    } else {
        console.log('Por favor ingresa un nombre para buscar.');
    }
  }

  // Obtener el rol del usuario:

  public obtenerRolUsuario(user: string, callback: (rol: number | null) => void) {
    if (user) {
        (window as any).myAPI.obtenerRol(user);

        (window as any).myAPI.ipcRenderer.once('rol-obtenido', (event: any, arg: { error: any; rol: number; }) => {
            if (arg.error) {
                console.error(arg.error);
                callback(null);
            } else {
                console.log(`Rol del usuario ${user}: ${arg.rol}`);
                callback(arg.rol);
            }
        });
    } else {
        console.log('Por favor ingresa un usuario para obtener su rol.');
        callback(null);
    }
  }

  public login(user: string, pass: string): Observable<boolean> {
    if (user) {
      (window as any).myAPI.login(user, pass);

      (window as any).myAPI.ipcRenderer.on('login_valid', (event: any, arg: any) => {
        if (arg.error) {
          console.error(arg.error);
          this.loginSubject.next(false);
        } else {
          //const isValid = arg.rows.length > 0;
          console.log('login_valid:', arg);
          const isValid = IUser.iniciar_session(arg.rows.length);
          if (isValid) {
            this.currentUserRole = arg.rows[0].rol; 
            this.currentUserUser = arg.rows[0].id; 
          // console.log('rows[0].id; :', arg.rows[0].id);
          }
          
          this.loginSubject.next(isValid);
        }
      });
    } else {
      console.log('Por favor ingresa un nombre para buscar.');
      this.loginSubject.next(false);
    }
    
    return this.loginSubject.asObservable();
  }

  // Método para obtener el rol almacenado
  public getCurrentUserRole(): number | null {
    return this.currentUserRole;
  }
  public getCurrentUserUser(): number | null {
    return this.currentUserUser;
  }

  // Método para limpiar el rol (opcional, útil en logout)
  public clearCurrentUserRole(): void {
    this.currentUserRole = null;
    this.currentUserRole = null;
  }

  public logout() {
    this.clearCurrentUserRole();
    this.loginSubject.next(IUser.cerrar_session()); // Notificar a los suscriptores que hubo un logout
    console.log('Usuario desconectado - Rol limpiado');
    // Agregar aquí cualquier otra lógica de limpieza necesaria
  }


  
}
