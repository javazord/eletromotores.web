import UserService from "../../app/service/user/userService";
import React, { useState } from 'react';
import { Validate } from './userAttributes';
import useToast from "../../components/toast";
import { Toast } from "primereact/toast";
import { Button } from 'primereact/button'
import { Card, Form, Row, Col, Container } from 'react-bootstrap';

const UserRegister = () => {

  const [state, setState] = useState({
    login: '',
    password: '',
    repeatPassword: '',
    role: 'USER'
  });
  const { showMessageSuccess, showMessageAlert, showMessageError, toast } = useToast();
  const [loading, setLoading] = useState(false);
  const service = new UserService();

  const create = () => {

    try {
      Validate(state);
    } catch (error) {
      const msgs = error.mensagens;
      showMessageAlert(msgs);
      return false;
    }
    setLoading(true);
    service.save(state)
      .then(response => {
        load();
        resetState();
      }).catch(erro => {
        console.log(erro)
        showMessageError(erro.response.data)
      })
  }

  const resetState = () => {
    setState({
      login: '',
      password: '',
      repeatPassword: '',
      role: 'USER'
    });
  };

  const load = () => {
    setTimeout(() => {
      setLoading(false);
      showMessageSuccess('Usuário cadastrado com sucesso!');
    }, 2000);
  }

  const handleInputChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const roles = [
    { role: 'Usuário', value: 'USER' },
    { role: 'Administrador', value: 'ADMIN' }
  ]

  const footer = (
    <div className="d-flex justify-content-end">
      <Button label="Cadastrar" icon="pi pi-check" onClick={create} loading={loading} size="sm" />
    </div>
  );

  return (
    <>
      <Container>
        <Card>
          <Card.Header as="h5">Cadastrar Colaborador</Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Label>Login</Form.Label>
                  <Form.Control
                    name="login"
                    value={state.login}
                    onChange={handleInputChange}
                    placeholder="Login"
                    size="sm"
                  />
                  <Form.Label>Função</Form.Label>
                  <Form.Select
                    value={state.role}
                    onChange={handleInputChange}
                    name="role"
                    size="sm"
                  >
                    {roles.map((role) => (
                      <option key={role.role} value={role.role}>
                        {role.role}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={6}>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    name="password"
                    value={state.password}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Senha"
                    size="sm"
                  />
                  <Form.Label>Repetir Senha</Form.Label>
                  <Form.Control
                    name="repeatPassword"
                    value={state.repeatPassword}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Repetir senha"
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
            </Form>
          </Card.Body>
          <Card.Footer>{footer}</Card.Footer>
        </Card>
      </Container>

      <Toast ref={toast} />
    </>
  );
}

export default UserRegister;
