import ApiService from "../../apiservice";

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

    update(usuario){
        return this.put(`/${usuario.id}`, usuario)
    }

    search(userFilter){
        let params = `?login=${userFilter.login}`

        params = `${params}&condition=${userFilter.condition}`
                
        return this.get(params)
    }

    blankPassword(usuario){
        return this.get('/update-password', usuario)
    }
    
}