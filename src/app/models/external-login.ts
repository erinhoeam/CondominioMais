export class ExternalLogin{
    constructor(id:String,email:String, accessToken:String){
        this.id = id;
        this.email = email;
        this.accessToken = accessToken;
    }
    id:String;
    email:String;
    accessToken:String;
}