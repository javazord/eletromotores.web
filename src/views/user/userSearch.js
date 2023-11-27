import React, { useContext, useState } from "react";
import UserTable from "./userTable";
import { Button } from 'primereact/button';
import { AuthContext } from "../../main/authProvider";
import EditUserDialog from "./editUserDialog";
import UserService from "../../app/service/user/userService";
import useToast from "../../components/toast";
import { Toast } from "primereact/toast";
import { Card, Form, Row, Col } from 'react-bootstrap';


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
    const [loading, setLoading] = useState(false);

    const buttonSearch = () => {
        const userFilter = { login, condition }
        service.search(userFilter)
            .then(response => {
                load(response.data);
            }).catch(erro => {
                console.log(erro)
            })

    }

    const load = (lista) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (lista < 1) {
                showMessageAlert('Nenhum resultado encontrado.');
            } else {
                const list = lista.map(user => ({
                    ...user,
                    condition: user.condition ? 1 : 0
                }));
                setUsers(list);
            }
            setLista(lista);
        }, 2000);
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

            <Card>
                <Card.Header as="h5">Pesquisar</Card.Header>
                <Card.Body>
                    <Row className="d-flex align-items-end">
                        <Col>
                            <Form.Label>Login</Form.Label>
                            <Form.Control
                                name="login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                type="text"
                                placeholder="Informe o login"
                            />
                        </Col>
                        <Col>
                            <Form.Label>Condição</Form.Label>
                            <Form.Select
                                name="condition"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                            >
                                <option value="1">Ativado</option>
                                <option value="0">Desativado</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Button onClick={buttonSearch} className="btn btn-primary" icon="pi pi-search" label="Buscar" size="sm" loading={loading} />
                            <Toast ref={toast} />
                        </Col>
                    </Row>
                    <br />
                    <UserTable users={users} view={view} edit={edit} context={authUser} />
                    <EditUserDialog user={user} visible={editConfirmDialog} onHide={onHide} />
                </Card.Body>
            </Card>

        </>
    )
}

