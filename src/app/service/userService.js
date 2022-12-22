import ApiService from "../apiservice";

export default class UserService extends ApiService{

    constructor(){
        super('api/usuarios');
    }

    authenticate(credentials){
        return this.post('/autenticar', credentials)
    }

    save(usuario){
        return this.post('', usuario)
        
    }

    put(usuario){
        return this.put('/atualizar', usuario)
    }

    get(){
        return this.get()
    }


}