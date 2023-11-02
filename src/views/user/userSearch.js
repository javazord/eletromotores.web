import React, { useContext, useState } from "react";
import { Card } from 'primereact/card';
import UserTable from "./userTable";
import { Button } from 'primereact/button';
import { AuthContext } from "../../main/authProvider";
import EditUserDialog from "./editUserDialog";
import { Row, Col, Label, Input } from 'reactstrap';
import UserService from "../../app/service/user/userService";
import useToast from "../../components/toast";
import { Toast } from "primereact/toast";


export default function UserSearch() {

    const [login, setLogin] = useState('');
    const [condition, setCondition] = useState(1);
    const [users, setUsers] = useState([]);
    const [, setLista] = useState([]);
    const [user, setUser] = useState({});
    const [, setShowConfirmDialog] = useState(false);
    const [editConfirmDialog, setEditConfirmDialog] = useState(false);
    const service = new UserService();
    const { authUser } = useContext(AuthContext);
    const { showMessageAlert, toast } = useToast();

    const buttonSearch = () => {
        const userFilter = { login, condition }
        service.search(userFilter)
            .then(response => {
                const lista = response.data;
                if (lista.length < 1) {

                    showMessageAlert("Nenhum colaborador encontrado")
                } else {
                    const list = lista.map(user => ({
                        ...user,
                        condition: user.condition ? 1 : 0
                    }));
                    setUsers(list);
                }
                setLista(lista);
            }).catch(erro => {
                console.log(erro)
            })

    }

    const resetState = () => {
        setLogin('');
        setCondition(condition);
        setShowConfirmDialog(false);
        setEditConfirmDialog(false);
    }

    //modal para ver dados do usuário
    const view = (user) => {
        setShowConfirmDialog(true);
        setUser(user);
    }

    //modal para editar dados do usuário
    const edit = (user) => {
        setEditConfirmDialog(true);
        setUser(user);
    }

    const onHide = () => {
        resetState();
    }

    return (
        <>
            <Col className="col-md-8 mx-auto">

                <Card title="Pesquisar">
                    <Row className="d-flex align-items-end">
                        <Col>
                            <Label>Login</Label>
                            <Input name="login" value={login} onChange={e => setLogin(e.target.value)} type="text" className="form-control mt-1" placeholder="Informe o login" />
                        </Col>
                        <Col>
                            <Label>Condição</Label>
                            <select name="condition" value={condition} onChange={e => setCondition(e.target.value)} className="form-select mt-1" >
                                <option value="1">Ativado</option>
                                <option value="0">Desativado</option>
                            </select>
                        </Col>
                        <Col>
                            <Button onClick={buttonSearch} className="btn btn-primary" icon="pi pi-search" label="Buscar" size="sm" />
                            <Toast ref={toast} />
                        </Col>
                    </Row>
                    <br />
                    <UserTable users={users} view={view} edit={edit} context={authUser} />

                    <EditUserDialog user={user} visible={editConfirmDialog} onHide={onHide} />

                </Card>
            </Col>


        </>

    )
}

