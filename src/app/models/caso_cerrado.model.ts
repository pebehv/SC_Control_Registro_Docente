export class ICasoCerrado{

    id : number;
    observ: string;
    caso_inv: string;
    conclusion: string;
    recomend: string;

    constructor(){
        this.id = 0;
        this.observ = '';
        this.caso_inv = '';
        this.conclusion = '';
        this.recomend = '';
    }
    static fromObject(color: ICasoCerrado): ICasoCerrado{
        let obj = new ICasoCerrado();
        obj.id = color.id;
        obj.observ = color.observ;
        obj.caso_inv = color.caso_inv;
        obj.conclusion = color.conclusion;
        obj.recomend = color.recomend;
        
        return obj;
    }

    /*static iniciar_session(value: number): boolean{
        return value == 0 ? false : true;
    }
    static cerrar_session(): boolean{
        return false;
    }*/
}