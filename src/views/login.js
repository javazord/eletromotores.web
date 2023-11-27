import React, { useContext, useState } from "react";
import UserService from '../app/service/user/userService';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../main/authProvider';
import useToast from "../components/toast";
import { Toast } from "primereact/toast";
import { loginValidate, Validate } from "./user/userAttributes";
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

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
                            <Form.Label>Nova Senha</Form.Label>
                            <Form.Control type="password" value={user.password || ''} name="password" onChange={handleInputChange} size="sm" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label>Confirme a nova senha</Form.Label>
                            <Form.Control
                                type="password"
                                value={user.repeatPassword || ''}
                                name="repeatPassword"
                                onChange={handleInputChange}
                                size="sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-start mt-2">
                            <Form.Text muted>
                                A senha deve ter entre 8-10 caracteres, min um número, e um caractere especial (@, #, $, !, %, ^, & ou *)
                            </Form.Text>
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

                props.service.authenticate({
                    login: user.login,
                    password: user.password
                }).then(response => {
                    if (response.data.result) {
                        setShowAuthInputs(false);
                        setShowPasswordInputs(true);
                        setUser(response.data.user);
                    } else {
                        authContext.beginSession(response.data);
                        navigate('/home');
                    }
                }).catch(erro => {
                    showMessageError(erro.response.data);
                });

            } catch (error) {
                const msgs = error.mensagens;
                showMessageError(msgs);
                return false;
            }
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

    return (
        <>
            <div className="d-flex justify-content-center align-items-center " style={{ height: '85vh' }} >
                <Card style={{ width: '450px' }} border="0">
                    <Card.Img variant="top" alt="Card" src="https://media.istockphoto.com/id/520566511/pt/foto/de-motor-el%C3%A9ctrico-necessita-de-manuten%C3%A7%C3%A3o.jpg?s=612x612&w=0&k=20&c=ftqBNGuC4rLCT_H98j-xt3WXty8iYMklCYwQ4cn8kWE=" />

                    <Card.Body className="mt-3">

                        {showAuthInputs && (
                            <>
                                <Row className="p-1">
                                    <Col>
                                        <Form.Label>Login</Form.Label>
                                        <Form.Control value={user.login} name="login" onChange={handleInputChange} size="sm" required />
                                    </Col>
                                </Row>

                                <Row className=" p-1">
                                    <Col>
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control type="password" value={user.password || ''} name="password" onChange={handleInputChange} size="sm" required />
                                    </Col>
                                </Row>
                            </>
                        )}

                        {renderPasswordInputs()}
                        <Row className="p-1 mt-3">
                            <Col>
                                <Button className="col-md-12 p-1" type="submit" size="sm" onClick={autenticar}>Entrar</Button>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </div>

            <Toast ref={toast} />
        </>

    )
}

function myParams(Component) {
    return props => <Component service={new UserService()} {...props} />;
}

export default myParams(Login);