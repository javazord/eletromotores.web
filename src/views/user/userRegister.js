import React from "react";
import { Card } from 'primereact/card';
import UserService from "../../app/service/user/userService";
import { showMessageSuccess, showMessageError } from "../../components/toastr";
import HandleInputResetValues from "../../components/events/handleInputResetValues";
import Row from '../../components/grid/row';
import Col from '../../components/grid/col';
import FormGroup from "../../components/grid/form-group";
import HandleInputChange from "../../components/events/handleInputChange";
import { Button } from "primereact/button";
import { Divider } from 'primereact/divider';


class UserRegister extends React.Component {

    state = {
        login: '',
        password: '',
        repeatPassword: '',
        role: 'USER',
        loading: false
    }

    constructor() {
        super();
        this.service = new UserService();
    }

    create = () => {
        const { login, password, role } = this.state;
        const usuario = { login, password, role }
        this.load()
        this.service.save(usuario)
            .then(response => {
                showMessageSuccess('Usuário cadastrado com sucesso!')
                HandleInputResetValues()
            }).catch(erro => {
                console.log(erro)
                showMessageError(erro.response.data)
            })
    }

    load = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false });
        }, 500);
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {

        const footer = (
            <div className="d-flex justify-content-end">
                <Button label="Cadastrar" icon="pi pi-check" onClick={this.create} loading={this.state.loading} size="sm"/>
            </div>
        );
        return (
            <Row >
                <Col className="col-md-7 mx-auto">
                    <Card title={"Cadastrar Colaborador"} footer={footer} >
                        <Row>
                            <Col >
                                <input name="login" value={this.state.login} onChange={this.handleInputChange} className="form-control m-1" placeholder="Login" />

                                <select name="role" value={this.state.role} onChange={this.handleInputChange} className="form-select m-1" >
                                    <option value="USER">Usuario</option>
                                    <option value="ADMIN">Administrador</option>
                                </select>
                            </Col>
                            <Col>
                                <input name="password" value={this.state.password} onChange={this.handleInputChange} type="password" className="form-control m-1" placeholder="Senha" />

                                <input onChange={this.handleInputChange} type="password" className="form-control m-1" placeholder="Repetir senha" />

                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>


        )
    }
}
export default UserRegister
