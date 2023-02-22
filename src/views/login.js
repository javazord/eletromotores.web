import React, { Component } from "react";
import Card from '../components/card'
import UserService from '../app/service/user/userService';
import { Form, useNavigate } from "react-router-dom";
import { showMessageError } from "../components/toastr";
import Row from '../components/grid/row';
import Col from '../components/grid/col';
import { AuthContext } from '../main/authProvider'
import FormGroup from "../components/grid/form-group";
import { Button } from "primereact/button";


export class Login extends Component {

    state = {
        login: '',
        password: ''
    }

    constructor() {
        super();
        this.service = new UserService();
    }

    enter = () => {
        this.service.authenticate({
            login: this.state.login,
            password: this.state.password
        }).then(response => {
            this.context.beginSession(response.data)
            this.props.navHook('/home')
        }).catch(erro => {
            showMessageError(erro.response.data)
        })


    }

    render() {
        return (
            <Row >
                <Col className="col-md-6 mx-auto">
                    <Card title="Autenticar">

                        <Row>
                            <Col>
                                <FormGroup label="Login">
                                    <input type="email" value={this.state.login} name="login" onChange={e => this.setState({ login: e.target.value })} className="form-control" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup label="Senha">
                                    <input type="password" value={this.state.password} name="password" onChange={e => this.setState({ password: e.target.value })} className="form-control" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="d-flex justify-content-end mt-2">
                                <FormGroup >
                                    <Button onClick={this.enter} label="Entrar" icon="pi pi-sign-in"></Button>
                                </FormGroup>
                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Row>
        )

    }
}

Login.contextType = AuthContext;

function myParams(Component) {
    return props => <Component navHook={useNavigate()} />;
}

export default myParams(Login)