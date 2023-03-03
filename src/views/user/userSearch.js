import React from "react";
import UserService from "../../app/service/user/userService";
import { Card } from 'primereact/card';
import { showMessageAlert, showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import UserTable from "./userTable";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Condition, Role } from "./userAttributes";
import Row from "../../components/grid/row";
import Col from "../../components/grid/col";
import { AuthContext } from "../../main/authProvider";
import { Input, Label } from "reactstrap";


export default class UserSearch extends React.Component {

    state = {
        id: null,
        login: '',
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
                this.setState({ users: [] })
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
                <Button label="Atualizar" className="p-button-success" icon="pi pi-check" onClick={this.update} size="sm" />
                <Button label="Fechar" className="p-button-secondary" icon="pi pi-times" onClick={this.onHide} size="sm" />
            </div>
        );
        const btnShowfooter = (
            <div>
                <Button label="Fechar" className="p-button-secondary" icon="pi pi-times" onClick={this.onHide} size="sm" />
            </div>
        );
        return (
            <>

                <Card title="Pesquisar">
                    <Row className="d-flex align-items-end">
                        <Col>
                            <Label>Login</Label>
                            <Input name="login" value={this.state.login} onChange={this.handleInputChange} type="text" className="form-control mt-1" placeholder="Informe o login" id="inputLogin" />
                        </Col>
                        <Col>
                            <Label>Condição</Label>
                            <select name="condition" value={this.state.condition} onChange={this.handleInputChange} className="form-select mt-1" id="exampleSelect1">
                                <option value="1">Ativado</option>
                                <option value="0">Desativado</option>
                            </select>
                        </Col>
                        <Col>
                            <Button onClick={this.buttonSearch} className="btn btn-primary" icon="pi pi-search" label="Buscar" size="sm" />
                        </Col>
                    </Row>
                    <br />

                    <UserTable users={this.state.users} view={this.view} edit={this.edit} context={this.context} />

                    <Dialog header={`Colaborador - ${this.state.user.login}`} visible={this.state.showConfirmDialog} modal={true} footer={btnShowfooter} onHide={this.onHide}>

                        <Row >
                            <Col>
                                <Label>Função</Label>
                                <Input type="text" className="form-control" name="role" value={Role(this.state.user)} readOnly />
                            </Col>

                            <Col>
                                <Label>Condição</Label>
                                <Input type="text" className="form-control" name="condition" value={Condition(this.state.user)} readOnly />
                            </Col>
                        </Row>

                    </Dialog>

                    <Dialog header="Colaborador" visible={this.state.editDialog} footer={btnAttfooter} modal={true} onHide={this.onHide}>

                        <Row >
                            <Col>
                                <Label>Login</Label>
                                <Input type="text" className="form-control" value={this.state.user.login} name="login" onChange={(this.handleInputChange)} readOnly />
                            </Col>

                            <Col>
                                <Label>Função</Label>
                                <select className="form-select" value={this.state.role} name="role" onChange={this.handleInputChange} >
                                    <option value={"ADMIN"}> Administrador </option>
                                    <option value={"USER"}> Usuário </option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label>Condição</Label>
                                <select className="form-select" value={this.state.condition} name="condition" onChange={this.handleInputChange}>
                                    <option value={true}> Ativado </option>
                                    <option value={false}> Desativado </option>
                                </select>
                            </Col>
                        </Row>

                    </Dialog>

                </Card>

            </>

        )
    }

}
UserSearch.contextType = AuthContext;
