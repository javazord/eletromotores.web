import { Card } from 'primereact/card';
import UserService from "../../app/service/user/userService";
import { Button } from "primereact/button";
import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Validate } from './userAttributes';
import useToast from "../../components/toast";
import { Toast } from "primereact/toast";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

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

  const footer = (
    <div className="d-flex justify-content-end">
      <Button label="Cadastrar" icon="pi pi-check" onClick={create} loading={loading} size="sm" />
    </div>
  );

  const roles = [
    { role: 'Usuário', value: 'USER' },
    { role: 'Administrador', value: 'ADMIN' }
  ]

  return (
    <>

      <Card title={"Cadastrar Colaborador"} footer={footer}>
        <Row>
          <Col className='col-md-6'>
            <InputText
              name="login"
              value={state.login}
              onChange={handleInputChange}
              placeholder="Login"
              className="w-full col-12 m-1"
            />
            <Dropdown
              value={state.role}
              onChange={handleInputChange}
              options={roles}
              optionLabel="role"
              name="role"
              className="w-full col-12 m-1"
            />
          </Col>
          <Col className='col-md-6'>
            <InputText
              name="password"
              value={state.password}
              onChange={handleInputChange}
              type="password"
              placeholder="Senha"
              className="w-full col-12 m-1"
            />
            <InputText
              name="repeatPassword"
              value={state.repeatPassword}
              onChange={handleInputChange}
              type="password"
              placeholder="Repetir senha"
              className="w-full col-12 m-1"
            />
          </Col>
        </Row>

      </Card>


      <Toast ref={toast} />
    </>
  )
}

export default UserRegister;
