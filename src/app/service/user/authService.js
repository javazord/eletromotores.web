import ApiService from "../../apiservice";
import LocalStorageService from "../../localStorage";
import jwt from 'jsonwebtoken';

export const USUARIO_LOGADO = '_usuario_logado'
export const TOKEN = 'access_token'

export default class AuthService {

    static autenticationUser(){
        const obj = LocalStorageService.getItem(TOKEN)
        
        if(obj == null || !obj.token){
            return false;
        }
        const decodedToken = jwt.decode(obj.token)
        const expiration = decodedToken.exp
        const isTokenInvalido = Date.now() >= (expiration * 1000)
        
        return !isTokenInvalido;
    }

    static removeUserAutenticated(){
        LocalStorageService.removeItem(USUARIO_LOGADO)
        LocalStorageService.removeItem(TOKEN)
    }

    static loginto(usuario, tokenDTO){
        LocalStorageService.setItem(USUARIO_LOGADO, usuario)
        LocalStorageService.setItem(TOKEN, tokenDTO);
        ApiService.tokenRegister(tokenDTO)
    }

    static refreshSession(){
        const token  = LocalStorageService.getItem(TOKEN)
        const usuario = LocalStorageService.getItem(USUARIO_LOGADO)
        AuthService.loginto(usuario, token)
        return usuario;
    }
}