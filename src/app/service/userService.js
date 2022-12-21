import ApiService from "../apiservice";

export default class UserService extends ApiService{

    constructor(){
        super('/api/usuarios');
    }

    authenticate(credentials){
        return this.post('/autenticar', credentials)
    }




}