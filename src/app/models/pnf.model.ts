export class IPNF{

    id : number;
    name: string;
    activo : boolean;

    

    constructor(){
        this.id = 0;
        this.name = '';
        this.activo = true;
     
    }
    static fromObject(color: IPNF): IPNF{
        let obj = new IPNF();
        obj.id = color.id;
        obj.name = color.name;
        obj.activo = color.activo;

        return obj;
    }
}