import { render } from "@testing-library/react";
import React from "react";
import LocalStorageService from "../app/localStorage";

class Home extends React.Component {

    state = {
        usuarioLogado: LocalStorageService.getItem('_usuario_logado')
    }
    
    render() {
        return (
            <div>
                <h3>Bem Vindo {this.state.usuarioLogado.login}</h3>
            </div>
        )
    }


}

export default Home
