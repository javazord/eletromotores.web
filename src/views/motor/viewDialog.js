import React from "react";
import Col from "../../components/grid/col";
import Row from "../../components/grid/row";
import { Dialog } from "primereact/dialog";
import FormGroup from "../../components/grid/form-group";
import Checkbox from "../../components/grid/checkbox";
import { Button } from 'primereact/button'

function Modal(props) {
    const { motor, visible, onHide } = props;
    if (!motor) {
        return null;
    }
    const footer = (
        <Button className="btn btn-secondary" label="Fechar" onClick={onHide} size="sm"/>
    )
    return (


        <Dialog
            header={`Detalhes do Motor ${motor.marca} | Data ${new Intl.DateTimeFormat('pt-BR').format(motor.registro)}`}
            visible={visible}
            modal={true}
            style={{ width: '60vw' }}
            onHide={onHide} // Passa a propriedade onHide para o componente Dialog
            footer={footer}
        >
            <Row>
                <Col>
                    <FormGroup label="Marca">
                        <input name="marca" value={motor.marca} className="form-control" readOnly />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Modelo">
                        <input name="modelo" value={motor.modelo} className="form-control" readOnly />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Ranhuras">
                        <input name="ranhuras" value={motor.ranhuras} className="form-control" readOnly />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Rotação">
                        <input name="rotacao" value={motor.rotacao} className="form-control" readOnly />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup label="Peso">
                        <input name="peso" value={motor.fio.peso} className="form-control" readOnly />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Potência">
                        <input name="potencia" value={motor.potencia} className="form-control" readOnly />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Voltagem">
                        <input name="voltagem" value={motor.voltagens.join(', ')} className="form-control" readOnly />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup label="Amperagem">
                        <input name="amperagem" value={motor.amperagens.join(', ')} className="form-control" readOnly />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup label="Usuário">
                        <input name="usuario" value={motor.usuario.login} className="form-control" readOnly />
                    </FormGroup>
                </Col>
            </Row>
        </Dialog>
    );
}

export default Modal;