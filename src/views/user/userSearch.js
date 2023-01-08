import React from "react";
import { Link } from "react-router-dom";
import UserService from "../../app/service/user/userService";
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { showMessageAlert, showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import UserTable from "./userTable";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { Condition, Role } from "./userAttributes";
import HandleInputChange from '../../components/events/handleInputChange'
import Row from "../../components/row";
import Col from "../../components/col";



class UserSearch extends React.Component {

    state = {
        id: null,
        login: '',
        password: '',
        condition: 1,
        role: '',
        users: [],
        user: {},
        showConfirmDiaglog: false,
        editDiaglog: false
    }

    constructor() {
        super();
        this.service = new UserService();
    }

    buttonSearch = () => {
        const { login, condition } = this.state;
        const userFilter = { login, condition }
        this.service.search(userFilter)
            .then(response => {
                const list = response.data;
                if (list.length < 1) {
                    showMessageAlert("Nenhum colaborador encontrado.")
                }
                this.setState({ users: list })
            }).catch(erro => {
                console.log(erro)
            })

    }

    update = () => {
        const { id, login, password, role } = this.state;
        const usuario = {
            id,
            login,
            password,
            role,
            condition: typeof this.state.condition === 'string' ? parseInt(this.state.condition) : this.state.condition

        }
        this.service.update(usuario)
            .then(response => {
                this.clearLogin()

                showMessageSuccess('Usuário atualizado com sucesso!')
                this.cancel()
                //limpar o input search

                //atualiza table
                this.buttonSearch()
            }).catch(erro => {
                showMessageError(erro.response.data)
            })
    }

    clearLogin = () => {
        this.setState({ login: '', condition: 1, role: '', password: '' })
    }

    //modal para ver dados do usuário
    view = (user) => {
        this.setState({ showConfirmDiaglog: true, user: user })
    }

    //modal para editar dados do usuário
    edit = (user) => {
        this.setState({ id: user.id, role: user.role, login: user.login, password: user.password })
        this.setState({ editDiaglog: true, user: user })
    }

    //modal para cancelar a atualização de dados
    cancel = () => {
        this.setState({ editDiaglog: false, user: {} })
        this.clearLogin()
    }


    render() {

        const footer = (
            <div>
                <Button label="Atualizar" className="p-button-success" icon="pi pi-check" onClick={this.update} />
                <Button label="Cancelar" className="p-button-danger" icon="pi pi-times" onClick={this.cancel} />
            </div>
        );

        return (
            <>
                <div className="row justify-content-end m-auto p-md-1">
                    <Link to={'/cadastro-colaboradores'}>
                        <button className="btn btn-primary" href="/cadastro-colaboradores">Novo</button>
                    </Link>

                </div>


                <Card title="Pesquisar">
                    <Row>
                        <Col>
                            <input value={this.state.login} onChange={HandleInputChange} type="text" className="form-control" placeholder="Informe o login" id="inputLogin" />
                        </Col>
                        <Col>
                            <select value={this.state.condition} onChange={HandleInputChange} className="form-control" id="exampleSelect1">
                                <option value="1">Ativado</option>
                                <option value="0">Desativado</option>
                            </select>
                        </Col>
                        <Col>
                            <button onClick={this.buttonSearch} className="btn btn-primary" type="submit">Buscar</button>
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col className="-md-12">
                            <UserTable users={this.state.users} view={this.view} edit={this.edit} />
                        </Col>
                    </Row>



                    <div>
                        <Dialog header={this.state.user.login} visible={this.state.showConfirmDiaglog} modal={true} style={{ width: '30vw' }} onHide={() => this.setState({ showConfirmDiaglog: false })}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <input type="text" className="form-control" value={Role(this.state.user)} readOnly />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <input type="text" className="form-control" value={Condition(this.state.user)} readOnly />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Dialog>
                    </div>


                    <div>
                        <Dialog header="Colaborador" visible={this.state.editDiaglog} footer={footer} modal={true} style={{ width: '50vw' }} onHide={() => this.setState({ editDiaglog: false, login: '' })}>
                            <div className="row mb-2">

                                <Col>
                                    <FormGroup>
                                        <input type="text" className="form-control" value={this.state.user.login} name="login" onChange={HandleInputChange} disabled />
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="password" className="form-control" value={this.state.user.password} name="password" onChange={HandleInputChange} disabled />
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup>
                                        <select className="form-control" value={this.state.role} name="role" onChange={HandleInputChange} >
                                            <option value={"ROLE_ADMIN"}> Administrador </option>
                                            <option value={"ROLE_USER"}> Usuário </option>
                                        </select>
                                    </FormGroup>

                                    <FormGroup>
                                        <select className="form-control" value={this.state.condition} name="condition" onChange={HandleInputChange}>
                                            <option value={1}> Ativado </option>
                                            <option value={0}> Desativado </option>
                                        </select>
                                    </FormGroup>
                                </Col>

                            </div>
                        </Dialog>
                    </div>
                </Card>

            </>

        )
    }

}

export default UserSearch