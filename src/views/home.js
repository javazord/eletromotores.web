import { render } from "@testing-library/react";
import React from "react";
import { AuthContext } from "../main/authProvider";

export default class Home extends React.Component {
    
    render() {
       const usuarioLogado = this.context.authUser;
        return (
            <div>
                <h3>Bem Vindo {usuarioLogado.login}</h3>
            </div>
        )
    }


}
Home.contextType = AuthContext;
