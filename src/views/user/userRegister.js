import React from "react";
import Card from "../../components/card";
import UserService from "../../app/service/user/userService";
import { showMessageSuccess, showMessageError } from "../../components/toastr";
import HandleInputResetValues from "../../components/events/handleInputResetValues";
import Row from '../../components/row';
import Col from '../../components/col';
import FormGroup from "../../components/form-group";
import HandleInputChange from "../../components/events/handleInputChange";


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
        const { login, password, role } = this.state;
        const usuario = { login, password, role }

        this.service.save(usuario)
            .then(response => {
                showMessageSuccess('Usuário cadastrado com sucesso!')
                HandleInputResetValues()
            }).catch(erro => {
                showMessageError(erro.response.data)
            })
    }

    render() {
        return (
            <Card title="Cadastrar Colaborador">

                <Row>
                    <Col>
                        <FormGroup>
                            <input onChange={HandleInputChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="Login" />
                        </FormGroup>

                        <FormGroup>
                            <select value={this.state.role} onChange={HandleInputChange} className="form-control" id="exampleSelect1">
                                <option value="ROLE_USER">Usuario</option>
                                <option value="ROLE_ADMIN">Administrador</option>
                            </select>
                        </FormGroup>
                    </Col>
                    
                    <Col>
                        <FormGroup>
                            <input onChange={HandleInputChange} type="password" className="form-control" placeholder="Senha" />
                        </FormGroup>
                        <FormGroup>
                            <input onChange={HandleInputChange} type="password" className="form-control" placeholder="Repetir senha" />
                        </FormGroup>

                    </Col>
                </Row>

                <button onClick={this.create} type="button" className="btn btn-success">Cadastrar</button>

            </Card>

        )
    }
}
export default UserRegister
