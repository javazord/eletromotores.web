import React from "react";
import AuthService from "../app/service/user/authService";

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
const AProvider = AuthContext.Provider;

class AuthProvider extends React.Component{

    state = {
        authUser: null,
        authenticated: false
    }

    beginSession = (usuario) => {
        AuthService.loginto(usuario)
        this.setState({authenticated: true, authUser: usuario})
    }

    endSession = () => {
        AuthService.removeUserAutentication();
        this.setState({authenticated: false, authUser: null})
    }

    render(){
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
export default AuthProvider