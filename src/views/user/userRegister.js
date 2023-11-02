import { Card } from 'primereact/card';
import UserService from "../../app/service/user/userService";
import { Button } from "primereact/button";
import React, { useState } from 'react';
import { Row, Col, Input } from 'reactstrap';
import { Validate } from './userAttributes';
import useToast from "../../components/toast";
import { Toast } from "primereact/toast";

export function UserRegister() {

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

  const footer = (
    <div className="d-flex justify-content-end">
      <Button label="Cadastrar" icon="pi pi-check" onClick={create} loading={loading} size="sm" />
    </div>
  );

  return (
    <>
        <Col className="col-md-8 mx-auto">
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
      <Toast ref={toast} />
    </>
  )
}

export default UserRegister;
