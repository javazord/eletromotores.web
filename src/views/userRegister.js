import React from "react";
import Card from "../components/card";

class UserRegister extends React.Component {

    state = {
        login: '',
        password: '',
        repeatPassword: '',
        role: 'Usuario'
    }

    create = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div className="bs-docs-section">
                <Card title="Cadastrar Colaborador">

                    <div className="row ">
                        <div className="col">

                            <div className="form-group mb-2">
                                <input onChange={e => this.setState({ login: e.target.value })} type="email" className="form-control" id="exampleInputEmail1" placeholder="Login" />
                            </div>

                            <div className="col ">
                                <div className="form-group">
                                    <select value={this.state.role} onChange={e => this.setState({ role: e.target.value })} className="form-select" id="exampleSelect1">
                                        <option value="Usuario">Usuario</option>
                                        <option value="Administrador">Administrador</option>
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
            </div>

        )
    }
}

export default UserRegister
