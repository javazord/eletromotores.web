import React from "react";
import Card from "../components/card";
import UserService from "../app/service/userService";
import { showMessageSuccess, showMessageError } from "../components/toastr";


class UserRegister extends React.Component {

    state = {
        login: '',
        password: '',
        repeatPassword: '',
        role: 'ROLE_USER'
    }

    constructor() {
        super();
        this.service = new UserService();
    }

    create = () => {
        const usuario = {
            login: this.state.login,
            password: this.state.password,
            role: this.state.role
        }
        this.service.save(usuario)
            .then(response => {
                showMessageSuccess('Usuário cadastrado com sucesso!')
                this.handleReset()
            }).catch(erro => {
                showMessageError(erro.response.data)
            })
    }

    handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );

        this.setState({
            itemvalues: [{}]
        });
    }


    render() {
        return (
                <Card title="Cadastrar Colaborador">

                    <div className="row ">
                        <div className="col">

                            <div className="form-group mb-2">
                                <input onChange={e => this.setState({ login: e.target.value })} type="email" className="form-control" id="exampleInputEmail1" placeholder="Login" />
                            </div>

                            <div className="col ">
                                <div className="form-group">
                                    <select value={this.state.role} onChange={e => this.setState({ role: e.target.value })} className="form-select" id="exampleSelect1">
                                        <option value="ROLE_USER">Usuario</option>
                                        <option value="ROLE_ADMIN">Administrador</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-2">
                                <input onChange={e => this.setState({ password: e.target.value })} type="password" className="form-control" placeholder="Senha" />
                            </div>
                            <div className="form-group mb-2">
                                <input onChange={e => this.setState({ repeatPassword: e.target.value })} type="password" className="form-control" placeholder="Repetir senha" />
                            </div>

                        </div>



                    </div>

                    <button onClick={this.create} type="button" className="btn btn-success">Cadastrar</button>


                </Card>

        )
    }
}



export default UserRegister
