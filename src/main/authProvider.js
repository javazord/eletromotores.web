import React, {createContext} from "react";
import ApiService from "../app/apiservice";
import AuthService from "../app/service/user/authService";
import jwt from 'jsonwebtoken'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
const AProvider = AuthContext.Provider;

export default class AuthProvider extends React.Component{

    state = {
        authUser: null,
        authenticated: false,
        isLoading: true
    }

    beginSession = (tokenDTO) => {
        
        const token = tokenDTO.token
        const claims = jwt.decode(token)
        const usuario = {
            id: claims.id,
            login: claims.login,
            role: claims.role
        }
        
        AuthService.loginto(usuario, tokenDTO)
        this.setState({authenticated: true, authUser: usuario})
    }

    endSession = () => {
        AuthService.removeUserAutenticated();
        this.setState({authenticated: false, authUser: null})
    }

    async componentDidMount(){
        const authenticated = AuthService.autenticationUser()
        
        if(authenticated){
            const usuario = await AuthService.refreshSession()
            
            this.setState({
                authenticated: true,
                authUser: usuario,
                isLoading: false
            })
        } else {
            this.setState( previousState => {
                return {
                    ...previousState,
                    isLoading: false
                }
            })
        }
    }

    render(){

        if(this.state.isLoading){
            return null;
        }

        const context = {
            authUser: this.state.authUser,
            authenticated: this.state.authenticated,
            beginSession: this.beginSession,
            endSession: this.endSession
        }

        return(
            <AProvider value={context}>
                {this.props.children}
            </AProvider>
        )
    }
}