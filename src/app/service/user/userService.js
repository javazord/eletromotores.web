import ApiService from "../../apiservice";

export default class UserService extends ApiService{

    constructor(){
        super('api/usuarios');
    }

    authenticate(credentials) {
        const params = new URLSearchParams();
        params.append('login', credentials.login);
        params.append('password', credentials.password);
    
        return this.get(`/autenticar?${params.toString()}`);
    }
    

    save(usuario){
        return this.post('', usuario)
    }

    update(usuario){
        return this.put(`/${usuario.id}`, usuario)
    }

    search(userFilter) {
        let params = '';
        
        if (userFilter.login) {
            params += `?login=${userFilter.login}`;
        }
    
        if (userFilter.condition !== undefined) {
            params += `${params ? '&' : '?'}condition=${userFilter.condition}`;
        }
        
        return this.get(params);
    }
    

    blankPassword(user){
        let params = `?login=${user.login}`
        return this.getLogin('/update-password', params)
    }
    
}