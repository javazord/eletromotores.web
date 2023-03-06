import React, { Component } from "react";
import { Card } from 'primereact/card';
import UserService from '../app/service/user/userService';
import { useNavigate } from "react-router-dom";
import { showMessageError } from "../components/toastr";
import { AuthContext } from '../main/authProvider';
import { Button } from "primereact/button";
import { Row, Col, Input, Label } from "reactstrap";


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
        const header = (
            <img alt="Card" src="https://media.istockphoto.com/id/520566511/pt/foto/de-motor-el%C3%A9ctrico-necessita-de-manuten%C3%A7%C3%A3o.jpg?s=612x612&w=0&k=20&c=ftqBNGuC4rLCT_H98j-xt3WXty8iYMklCYwQ4cn8kWE=" style={{ maxWidth: "100%", width: "100%" }} />
        );

        return (
            <Row>
                <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card title="Autenticar" header={header}  style={{ width: "500px", height: "630px" }}>

                        <Row>
                            <Col>
                                <Label>Login</Label>
                                <Input type="email" value={this.state.login} name="login" onChange={e => this.setState({ login: e.target.value })} className="form-control" />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Label>Senha</Label>
                                <Input type="password" value={this.state.password} name="password" onChange={e => this.setState({ password: e.target.value })} className="form-control" />
                            </Col>
                        </Row>

                        <Row>
                            <Col className="col-md-12 mt-3">
                                <Button className="col-md-12" onClick={this.enter} label="Entrar" size="sm"></Button>
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