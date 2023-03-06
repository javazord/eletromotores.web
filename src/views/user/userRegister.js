import { Card } from 'primereact/card';
import UserService from "../../app/service/user/userService";
import { showMessageSuccess, showMessageError, showMessageAlert } from "../../components/toastr";
import { Button } from "primereact/button";
import React, { useState } from 'react';
import { Row, Col, Input } from 'reactstrap';
import { Validate } from './userAttributes';

const UserRegister = () => {

  const [state, setState] = useState({
    login: '',
    password: '',
    repeatPassword: '',
    role: 'USER',
    loading: false
  });

  const service = new UserService();

  const create = () => {
    const { login, password, repeatPassword, role } = state;
    const usuario = { login, password, repeatPassword, role }

    try {
      Validate(usuario);
    } catch (error) {
      const msgs = error.mensagens;
      msgs.forEach(msg => showMessageAlert(msg));
      return false;
    }
    load()
    service.save(usuario)
      .then(response => {
        showMessageSuccess('Usuário cadastrado com sucesso!')
        handleInputResetValues()
      }).catch(erro => {
        console.log(erro)
        showMessageError(erro.response.data)
      })
  }

  const load = () => {
    setState({ ...state, loading: true });
    setTimeout(() => {
      setState({ ...state, loading: false });
    }, 500);
  };

  const handleInputChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleInputResetValues = () => {
    setState({
      login: '',
      password: '',
      repeatPassword: '',
      role: 'USER',
      loading: false
    });
  }

  const footer = (
    <div className="d-flex justify-content-end">
      <Button label="Cadastrar" icon="pi pi-check" onClick={create} loading={state.loading} size="sm" />
    </div>
  );

  return (
    <Row >
      <Col className="col-md-7 mx-auto">
        <Card title={"Cadastrar Colaborador"} footer={footer} >
          <Row>
            <Col >
              <Input name="login" value={state.login} onChange={handleInputChange} className="form-control m-1" placeholder="Login" />

              <select name="role" value={state.role} onChange={handleInputChange} className="form-select m-1" >
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </Col>
            <Col>
              <Input name="password" value={state.password} onChange={handleInputChange} type="password" className="form-control m-1" placeholder="Senha" />

              <Input name="repeatPassword" value={state.repeatPassword} onChange={handleInputChange} type="password" className="form-control m-1" placeholder="Repetir senha" />

            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default UserRegister;
