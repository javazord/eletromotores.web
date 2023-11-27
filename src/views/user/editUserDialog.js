import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useEffect, useState } from "react";
import { Modal, Row, Col, Form } from 'react-bootstrap';
import UserService from "../../app/service/user/userService";
import useToast from "../../components/toast";

export default function EditUserDialog(props) {

    const service = new UserService();
    const { visible, onHide } = props;
    const { showMessageSuccess, showMessageError, toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(useEffect(() => {
        setUser(props.user);
    }, [props.user]));

    if (!user) {
        return null;
    }

    const load = () => {
        setTimeout(() => {
            setLoading(false);
            onHide();
        }, 1500);
    }

    const update = () => {
        const usuario = {
            id: user.id,
            login: user.login,
            password: user.password,
            role: user.role,
            condition: typeof user.condition === 'string' ? parseInt(user.condition) : user.condition

        }
        load()
        service.update(usuario)
            .then(response => {
                showMessageSuccess('Usuário atualizado com sucesso!')
                onHide();
            }).catch(erro => {
                console.log(erro)
                showMessageError(erro.response.data)
            })
    }

    const footer = (
        <><Button label="Atualizar" className="p-button-success" icon="pi pi-check" onClick={update} size="sm" loading={loading} />
            <Button label="Fechar" className="p-button-secondary" icon="pi pi-times" onClick={onHide} size="sm" /></>
    )

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <>
            <Modal show={visible} onHide={onHide} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Colaborador</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Group controlId="formLogin">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" value={user.login} name="login" onChange={handleOnChange} readOnly />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formRole">
                                <Form.Label>Função</Form.Label>
                                <Form.Select value={user.role} name="role" onChange={handleOnChange}>
                                    <option value={"ADMIN"}>Administrador</option>
                                    <option value={"USER"}>Usuário</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formCondition">
                                <Form.Label>Condição</Form.Label>
                                <Form.Select value={user.condition} name="condition" onChange={handleOnChange}>
                                    <option value={1}>Ativado</option>
                                    <option value={0}>Desativado</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>{footer}
                </Modal.Footer>
            </Modal>
            <Toast ref={toast} />
        </>
    )
}

