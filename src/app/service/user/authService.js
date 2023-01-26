import LocalStorageService from "../../localStorage";

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService {

    static autenticationUser(){
        const user = LocalStorageService.getItem(USUARIO_LOGADO)
        return user && user.id;
    }

    static removeUserAutenticated(){
        LocalStorageService.removeItem(USUARIO_LOGADO)
    }

    static loginto(usuario){
        LocalStorageService.setItem(USUARIO_LOGADO, usuario)
    }

    static getAuthenticatedUser(){
        return LocalStorageService.getItem(USUARIO_LOGADO)
    }
}