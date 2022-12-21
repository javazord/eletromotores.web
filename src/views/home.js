import { render } from "@testing-library/react";
import React from "react";
import axios from "axios";

export default class Home extends React.Component {
    
    state = {
        usuario: null
    }

    componentDidMount(){
        axios.get('http://localhost:9000/eletromotores/api/usuarios')
        .then(response =>{
            this.setState({usuario: response.data})
        }).catch(erro =>{
            console.log("falha na busca");
        })
    }


render(){
    return(
        <div>
            <h3>{this.state.usuario.login}</h3>
            <h3>{this.state.usuario.role}</h3>
            <h3>{this.state.usuario.condition}</h3>
        </div>
    )
}




    
}