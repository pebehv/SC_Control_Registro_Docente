export class IUser{

    id : number;
    nombre: string;
    apellido: string;
    cedula: number;
    correo: string;
    //telefono: number;
    usuario: string;
    contrasena: string;
    rol: number;

    constructor(){
        this.id = 0;
        this.nombre = '';
        this.apellido = '';
        this.cedula = 0;
        this.correo = '';
        //this.telefono = 0;
        this.usuario = '';
        this.contrasena = '';
        this.rol = 0;
    }
    static fromObject(color: IUser): IUser{
        let obj = new IUser();
        obj.id = color.id;
        obj.nombre = color.nombre;
        obj.apellido = color.apellido;
        obj.cedula = color.cedula;
        obj.usuario = color.usuario;
        obj.contrasena = color.contrasena;
        obj.rol = color.rol;
        return obj;
    }

    static iniciar_session(value: number): boolean{
        return value == 0 ? false : true;
    }
    static cerrar_session(): boolean{
        return false;
    }
}