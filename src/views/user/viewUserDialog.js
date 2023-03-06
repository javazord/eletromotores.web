import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Input, Label, Row } from "reactstrap";
import { Condition, Role } from "./userAttributes";

export default function ViewUserDialog(props) {
    const { user, visible, onHide } = props;
    if (!user) {
        return null;
    }
    const footer = (
        <Button label="Fechar" className="p-button-secondary" icon="pi pi-times" onClick={onHide} size="sm" />
    )

    return (
        <Dialog header={`Colaborador - ${user.login}`} visible={visible}
        modal={true}
        style={{ width: '40vw' }}
        onHide={onHide} // Passa a propriedade onHide para o componente Dialog
        footer={footer}>

            <Row >
                <Col>
                    <Label>Função</Label>
                    <Input type="text" className="form-control" name="role" value={Role(user)} readOnly />
                </Col>

                <Col>
                    <Label>Condição</Label>
                    <Input type="text" className="form-control" name="condition" value={Condition(user)} readOnly />
                </Col>
            </Row>

        </Dialog>
    )


}