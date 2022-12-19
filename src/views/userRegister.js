import React from "react";
import Card from "../components/card";

class UserRegister extends React.Component {
    render() {
        return (
            <div className="container">
                <Card title="Cadastrar Usuário">

                    <div className="row ">
                        <div className="col-8">
                            <div className="form-group mb-2">
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Login" />
                            </div>


                            <div className="form-group mb-2">
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password" />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="exampleSelect1" className="form-label mt-4">Função</label>
                                <select className="form-select" id="exampleSelect1">
                                    <option >Administrador</option>
                                    <option>Usuario</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                        <button type="button" className="btn btn-success">Cadastrar</button>
                    

                </Card>
            </div>

        )
    }
}

export default UserRegister
