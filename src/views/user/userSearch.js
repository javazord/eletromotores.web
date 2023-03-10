import React from "react";
import UserService from "../../app/service/user/userService";
import { Card } from 'primereact/card';
import UserTable from "./userTable";
import { Button } from 'primereact/button';
import { AuthContext } from "../../main/authProvider";
import { Input, Label } from "reactstrap";
import ViewUserDialog from "./viewUserDialog";
import EditUserDialog from "./editUserDialog";
import { Row, Col } from 'reactstrap';
import { useToast } from "../../components/toast";
const { showMessageAlert, showMessageError, showMessageSuccess } = useToast();


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
        editConfirmDialog: false
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
                const lista = response.data;
                if (lista.length < 1) {
                    showMessageAlert("Nenhum colaborador encontrado.")
                } else {
                    const list = lista.map(user => ({
                        ...user,
                        condition: user.condition ? 1 : 0
                    }));
                    this.setState({ users: list });
                }
                this.setState({ users: lista });
            }).catch(erro => {
                console.log(erro)
            })

    }

    resetState = () => {
        this.setState({
            login: '',
            condition: this.state.condition,
            showConfirmDialog: false,
            editConfirmDialog: false
        })
    }

    //modal para ver dados do usuário
    view = (user) => {
        this.setState({ showConfirmDialog: true, user: user })
    }

    //modal para editar dados do usuário
    edit = (user) => {
        this.setState({ editConfirmDialog: true, user: user })
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    onHide = () => {
        this.resetState();
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

                    <ViewUserDialog user={this.state.user} visible={this.state.showConfirmDialog} onHide={this.onHide} />

                    <EditUserDialog user={this.state.user} visible={this.state.editConfirmDialog} onHide={this.onHide} />

                </Card>

            </>

        )
    }

}
UserSearch.contextType = AuthContext;
