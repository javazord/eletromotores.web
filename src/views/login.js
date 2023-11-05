import React, { useContext, useState } from "react";
import { Card } from 'primereact/card';
import UserService from '../app/service/user/userService';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../main/authProvider';
import { Button } from "primereact/button";
import { Row, Col, Input, Label } from "reactstrap";
import useToast from "../components/toast";
import { Toast } from "primereact/toast";
import { loginValidate, Validate } from "./user/userAttributes";

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const { showMessageSuccess, showMessageError, toast } = useToast();
    const [user, setUser] = useState({
        id: '',
        login: '',
        role: '',
        password: '',
        condition: 0,
        repeatPassword: ''
    })
    const [showPasswordInputs, setShowPasswordInputs] = useState(false);
    const [showAuthInputs, setShowAuthInputs] = useState(true);

    const renderPasswordInputs = () => {
        if (showPasswordInputs) {
            return (
                <>
                    <Row>
                        <Col>
                            <Label>Nova Senha</Label>
                            <Input type="password" value={user.password || ''} name="password" onChange={handleInputChange} className="form-control" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Label>Confirme a nova senha</Label>
                            <Input
                                type="password"
                                value={user.repeatPassword || ''}
                                name="repeatPassword"
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-start mt-2">
                            <small>
                                A senha deve ter entre 8 e 12 caracteres, pelo menos um número e um caractere especial (@, #, $, !, %, ^, & ou *)
                            </small>
                        </Col>
                    </Row>
                </>
            );
        }
    };

    const handleInputChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const autenticar = () => {

        if (showAuthInputs) {

            try {
                loginValidate(user);
            } catch (error) {
                const msgs = error.mensagens;
                showMessageError(msgs);
                return false;
            }

            props.service.authenticate({
                login: user.login,
                password: user.password
            }).then(response => {

                if (response.data.result) {
                    setShowAuthInputs(false)
                    setShowPasswordInputs(true);
                    setUser(response.data.user)
                }
                else {
                    authContext.beginSession(response.data)
                    navigate('/home')
                }

            }).catch(erro => {
                showMessageError(erro.data)
            })

        }

        if (showPasswordInputs) {
            try {
                Validate(user);
                props.service.update(user)
                    .then(response => {
                        showMessageSuccess('Senha atualizada com sucesso')
                        setShowPasswordInputs(false)
                        setShowAuthInputs(true)
                        setUser({ login: '', password: '' })
                    }).catch(erro => {
                        console.log(erro)
                    })
            } catch (error) {
                const msgs = error.mensagens;
                showMessageError(msgs);
                return false;
            }

        }

    }

    const header = (
        <img alt="Card" src="https://media.istockphoto.com/id/520566511/pt/foto/de-motor-el%C3%A9ctrico-necessita-de-manuten%C3%A7%C3%A3o.jpg?s=612x612&w=0&k=20&c=ftqBNGuC4rLCT_H98j-xt3WXty8iYMklCYwQ4cn8kWE=" style={{ maxWidth: "100%", width: "100%" }} />
    );

    return (
        <><Card header={header} style={{ width: "500px", height: "620px" }}>

            {showAuthInputs && ( // renderizar os inputs de login e senha apenas se showAuthInputs for true
                <>
                    <Row>
                        <Col>
                            <Label>Login</Label>
                            <Input type="email" value={user.login} name="login" onChange={handleInputChange} className="form-control" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Label>Senha</Label>
                            <Input type="password" value={user.password || ''} name="password" onChange={handleInputChange} className="form-control" />
                        </Col>
                    </Row>
                </>
            )}
            {renderPasswordInputs()}
            <Row>
                <Col className="col-md-12 mt-4">
                    <Button className="col-md-12" onClick={autenticar} label="Entrar" size="sm"></Button>
                </Col>
            </Row>


        </Card><Toast ref={toast} /></>
    )
}

function myParams(Component) {
    return props => <Component service={new UserService()} {...props} />;
}

export default myParams(Login);