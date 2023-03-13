import React, { Component, useContext, useState } from "react";
import { Card } from 'primereact/card';
import UserService from '../app/service/user/userService';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../main/authProvider';
import { Button } from "primereact/button";
import { Row, Col, Input, Label } from "reactstrap";
import useToast from "../components/toast";
import { Toast } from "primereact/toast";
import { loginValidate } from "./user/userAttributes";

export function Login(props) {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const { showMessageError, toast } = useToast();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [inputSenha, setInputSenha] = useState('');

    const enter = () => {
        const user = { login, password };

        try {
            loginValidate(user);
        } catch (error) {
            const msgs = error.mensagens;
            showMessageError(msgs);
            return false;
        }

        props.service.blankPassword({user})
        .then(response => {
            console.log(response.data);
        }).catch(erro =>{
            console.log(erro)
        })

        props.service.authenticate({
            login: login,
            password: password
        }).then(response => {
            authContext.beginSession(response.data)
            navigate('/home')
        }).catch(erro => {
            showMessageError(erro.response.data)
        })
    }

    const header = (
        <img alt="Card" src="https://media.istockphoto.com/id/520566511/pt/foto/de-motor-el%C3%A9ctrico-necessita-de-manuten%C3%A7%C3%A3o.jpg?s=612x612&w=0&k=20&c=ftqBNGuC4rLCT_H98j-xt3WXty8iYMklCYwQ4cn8kWE=" style={{ maxWidth: "100%", width: "100%" }} />
    );

    return (
        <Row>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card title="Autenticar" header={header} style={{ width: "500px", height: "630px" }}>

                    <Row>
                        <Col>
                            <Label>Login</Label>
                            <Input type="email" value={login} name="login" onChange={e => setLogin(e.target.value)} className="form-control" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Label>Senha</Label>
                            <Input type="password" value={password} name="password" onChange={e => setPassword(e.target.value)} className="form-control" />
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-12 mt-3">
                            <Button className="col-md-12" onClick={enter} label="Entrar" size="sm"></Button>
                        </Col>
                    </Row>

                </Card>
                <Toast ref={toast} />
            </Col>
        </Row>
    )
}

function myParams(Component) {
    return props => <Component service={new UserService()} {...props} />;
}

export default myParams(Login);