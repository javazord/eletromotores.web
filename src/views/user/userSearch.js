import React from "react";
import { Link } from "react-router-dom";
import UserService from "../../app/service/user/userService";
import {Card} from 'primereact/card'
import FormGroup from '../../components/grid/form-group'
import { showMessageAlert, showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import UserTable from "./userTable";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { Condition, Role } from "./userAttributes";
import HandleInputChange from '../../components/events/handleInputChange'
import Row from "../../components/grid/row";
import Col from "../../components/grid/col";


export default class UserSearch extends React.Component {

    state = {
        id: null,
        login: '',
        password: '',
        condition: 1,
        role: '',
        users: [],
        lista: [],
        user: {},
        showConfirmDialog: false,
        editDialog: false
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

                showMessageSuccess('Usuário atualizado com sucesso!')
                this.cancel()
                //limpar o input search

                //atualiza table
                this.clearLogin()
                this.setState({users: []})
            }).catch(erro => {
                showMessageError(erro.response.data)
            })
    }

    clearLogin = () => {
        this.setState({ login: '', condition: 1, role: '', password: '' })
    }

    //modal para ver dados do usuário
    view = (user) => {
        this.setState({ showConfirmDialog: true, user: user })
    }

    //modal para editar dados do usuário
    edit = (user) => {
        this.setState({ id: user.id, role: user.role, login: user.login, password: user.password })
        this.setState({ editDialog: true, user: user })
    }

    //modal para cancelar a atualização de dados
    cancel = () => {
        this.setState({ editDialog: false, user: {} })

    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    onHide = () => {
        this.setState({ editDialog: false, showConfirmDialog: false });
        this.clearLogin()
    }

    render() {

        const btnAttfooter = (
            <div>
                <Button label="Atualizar" className="p-button-success" icon="pi pi-check" onClick={this.update} size="sm"/>
                <Button label="Cancelar" className="p-button-danger" icon="pi pi-times" onClick={this.onHide} size="sm"/>
            </div>
        );
        const btnShowfooter = (
            <div>
                <Button label="Fechar" className="p-button-secondary" icon="pi pi-times" onClick={this.onHide} size="sm"/>
            </div>
        );
        return (
            <>

                <Card title="Pesquisar">
                    <Row>
                        <Col>
                            <input name="login" value={this.state.login} onChange={this.handleInputChange} type="text" className="form-control mt-1" placeholder="Informe o login" id="inputLogin" />
                        </Col>
                        <Col className="text-center">
                            <select name="condition" value={this.state.condition} onChange={this.handleInputChange} className="form-select mt-1" id="exampleSelect1">
                                <option value="1">Ativado</option>
                                <option value="0">Desativado</option>
                            </select>
                        </Col>
                        <Col>
                            <Button onClick={this.buttonSearch} className="btn btn-primary" icon="pi pi-search" label="Buscar" size="sm"/>
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col className="mx-auto">
                            <UserTable users={this.state.users} view={this.view} edit={this.edit} />
                        </Col>
                    </Row>



                    <div>
                        <Dialog header={this.state.user.login} visible={this.state.showConfirmDialog} modal={true} footer={btnShowfooter} onHide={this.onHide}>
                            <div >
                                <Row >
                                    <Col>
                                        <input type="text" className="form-control" name="role" value={Role(this.state.user)} readOnly />
                                    </Col>

                                    <Col>
                                        <input type="text" className="form-control" name="condition" value={Condition(this.state.user)} readOnly />

                                    </Col>
                                </Row>
                            </div>

                        </Dialog>
                    </div>


                    <div>
                        <Dialog header="Colaborador" visible={this.state.editDialog} footer={btnAttfooter} modal={true} onHide={this.onHide}>

                            <Row >
                                <Col>
                                        <input type="text" className="form-control m-1" value={this.state.user.login} name="login" onChange={(this.handleInputChange)} disabled />
                                    
                                        <input type="password" className="form-control m-1" value={this.state.user.password} name="password" onChange={this.handleInputChange} disabled />
                                    
                                </Col>

                                <Col>
                                        <select className="form-select m-1" value={this.state.role} name="role" onChange={this.handleInputChange} >
                                            <option value={"ADMIN"}> Administrador </option>
                                            <option value={"USER"}> Usuário </option>
                                        </select>

                                        <select className="form-select m-1" value={this.state.condition} name="condition" onChange={this.handleInputChange}>
                                            <option value={true}> Ativado </option>
                                            <option value={false}> Desativado </option>
                                        </select>
                                </Col>
                            </Row>
                        </Dialog>
                    </div>
                </Card>

            </>

        )
    }

}
