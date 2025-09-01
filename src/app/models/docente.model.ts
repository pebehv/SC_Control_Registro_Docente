export class IDocente{

    id : number;
    docente : number;
    nombre: string;
    apellido: string;
    ci: number;
    email: string;
    tlf: number;
    fechaNac: any
    sexo: string;
    carga_acad: number;
    carga_resp: string;
    observ: string;
    pnf: string;
    trayecto: number;
    sede: number;
    profesion: string;
    nombre_imagen: string;
    tipo_mime: string;
    imagen_data: string;
    estado: boolean;
    

    constructor(){
        this.id = 0;
        this.docente = 0;
        this.nombre = '';
        this.apellido = '';
        this.ci = 0;
        this.email = '';
        this.tlf = 0;
        this.fechaNac = null;
        this.sexo = '';
        this.carga_acad = 0;
        this.pnf = '';
        this.trayecto = 0;
        this.sede = 0;
        this.profesion = '';
        this.nombre_imagen = '';
        this.imagen_data = '';
        this.tipo_mime = '';
        this.carga_resp = '';
        this.observ = '';
        this.estado = false
    }
    static fromObject(color: IDocente): IDocente{
        let obj = new IDocente();
        obj.id = color.id;
        obj.docente = color.docente;
        obj.nombre = color.nombre;
        obj.apellido = color.apellido;
        obj.ci = color.ci;
        obj.email = color.email;
        obj.tlf = color.tlf;
        obj.fechaNac = color.fechaNac;
        obj.sexo = color.sexo;
        obj.carga_acad = color.carga_acad;
        obj.pnf = color.pnf;
        obj.trayecto = color.trayecto;
        obj.sede = color.sede;
        obj.profesion = color.profesion;
        obj.nombre_imagen = color.nombre_imagen;
        obj.tipo_mime = color.tipo_mime;
        obj.imagen_data = color.imagen_data;
        obj.carga_resp = color.carga_resp;
        obj.observ = color.observ;
        obj.estado = color.estado;
        return obj;
    }
}