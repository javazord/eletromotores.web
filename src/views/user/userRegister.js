import React from "react";
import Card from "../../components/card";
import UserService from "../../app/service/user/userService";
import { showMessageSuccess, showMessageError } from "../../components/toastr";
import HandleInputResetValues from "../../components/events/handleInputResetValues";
import Row from '../../components/grid/row';
import Col from '../../components/grid/col';
import FormGroup from "../../components/grid/form-group";
import HandleInputChange from "../../components/events/handleInputChange";


class UserRegister extends React.Component {

    state = {
        login: '',
        password: '',
        repeatPassword: '',
        role: 'USER'
    }

    constructor() {
        super();
        this.service = new UserService();
    }

    create = () => {
        const { login, password, role } = this.state;
        const usuario = { login, password, role }
        console.log(usuario)
        this.service.save(usuario)
            .then(response => {
                showMessageSuccess('Usuário cadastrado com sucesso!')
                HandleInputResetValues()
            }).catch(erro => {
                showMessageError(erro.response.data)
            })
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        return (
            <Card title="Cadastrar Colaborador">

                <Row>
                    <Col>
                        <FormGroup>
                            <input name="login" value={this.state.login} onChange={this.handleInputChange} className="form-control" placeholder="Login" />
                        </FormGroup>

                        <FormGroup>
                            <select name="role" value={this.state.role} onChange={this.handleInputChange} className="form-select" >
                                <option value="USER">Usuario</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <input name="password" value={this.state.password} onChange={this.handleInputChange} type="password" className="form-control" placeholder="Senha" />
                        </FormGroup>
                        <FormGroup>
                            <input onChange={this.handleInputChange} type="password" className="form-control" placeholder="Repetir senha" />
                        </FormGroup>

                    </Col>
                </Row>

                <button onClick={this.create} type="button" className="mt-2 btn btn-success"><span className="pi pi-check"></span> Cadastrar</button>

            </Card>

        )
    }
}
export default UserRegister
