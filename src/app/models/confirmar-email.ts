export class ConfirmaEmail{
    id:string;
    code:string;
    senha:String;
    confirmeSenha:String;

    constructor(id:string,code:string){
        this.id = id;
        this.code = code;
    }
}