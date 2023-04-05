import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import UserService from "../../app/service/user/userService";
import useToast from "../../components/toast";

export default function EditUserDialog(props) {

    const service = new UserService();
    const { visible, onHide } = props;
    const { showMessageSuccess, showMessageError, toast } = useToast();

    const [user, setUser] = useState(useEffect(() => {
        setUser(props.user);
    }, [props.user]));

    if (!user) {
        return null;
    }

    const update = () => {
        const usuario = {
            id: user.id,
            login: user.login,
            password: user.password,
            role: user.role,
            condition: typeof user.condition === 'string' ? parseInt(user.condition) : user.condition

        }
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
        <><Button label="Atualizar" className="p-button-success" icon="pi pi-check" onClick={update} size="sm" />
            <Button label="Fechar" className="p-button-secondary" icon="pi pi-times" onClick={onHide} size="sm" /></>
    )

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <>
            <Dialog header="Atualizar Colaborador"
                visible={visible}
                modal={true}
                style={{ width: '60vw' }}
                onHide={onHide} // Passa a propriedade onHide para o componente Dialog
                footer={footer}>

                <Row>
                    <Col>
                        <Label>Login</Label>
                        <Input type="text" className="form-control" value={user.login} name="login" onChange={(handleOnChange)} readOnly />
                    </Col>

                    <Col>
                        <Label>Função</Label>
                        <select className="form-select" value={user.role} name="role" onChange={handleOnChange}>
                            <option value={"ADMIN"}> Administrador </option>
                            <option value={"USER"}> Usuário </option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label>Condição</Label>
                        <select className="form-select" value={user.condition} name="condition" onChange={handleOnChange}>
                            <option value={1} defaultValue={user.condition === 1}> Ativado </option>
                            <option value={0} defaultValue={user.condition === 0}> Desativado </option>
                        </select>
                    </Col>
                </Row>

            </Dialog>
            <Toast ref={toast} />
        </>
    )
}

