import React from "react";
import Col from "../../components/grid/col";
import Row from "../../components/grid/row";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { Input, Label } from "reactstrap";

export default function ViewMotorDialog(props) {
    const { motor, visible, onHide } = props;
    if (!motor) {
        return null;
    }
    const footer = (
        <Button label="Fechar" className="p-button-secondary" icon="pi pi-times" onClick={onHide} size="sm" />
    )
    return (

        <Dialog
            header={`Registrado em ${new Intl.DateTimeFormat('pt-BR').format(motor.registro)}`}
            visible={visible}
            modal={true}
            style={{ width: '60vw' }}
            onHide={onHide} // Passa a propriedade onHide para o componente Dialog
            footer={footer}
        >
            <Row>
                <Col>
                    <Label>Marca</Label>
                    <Input name="marca" value={motor.marca} type="text" className="form-control" disabled />
                </Col>
                <Col>
                    <Label>Modelo</Label>
                    <Input name="modelo" value={motor.modelo} type="text" className="form-control" disabled />
                </Col>
                <Col>
                    <Label>Ranhuras</Label>
                    <Input name="ranhuras" value={motor.ranhuras} type="number" className="form-control" disabled />
                </Col>
                <Col>
                    <Label>Rotação</Label>
                    <Input name="rotacao" value={motor.rotacao} type="number" className="form-control" disabled />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Label>Peso</Label>
                    <Input id="peso" value={motor.fio.peso} type="number" className="form-control" disabled />
                </Col>
                <Col>
                    <Label>Potência</Label>
                    <Input name="potencia" value={motor.potencia} type="number" className="form-control" disabled />
                </Col>
                <Col>
                    <Label>Comprimento</Label>
                    <Input name="medidaInterna" value={motor.medidaInterna} type="number" min="1" max="100" className="form-control" disabled />
                </Col>
                <Col>
                    <Label>Medida Externa</Label>
                    <Input name="medidaExterna" value={motor.medidaExterna} type="number" className="form-control" disabled />
                </Col>
            </Row>

            <Row>
                {
                    motor.fio.awgs.map((valor, index) => (
                        <Col className="col-md-2" key={index}>
                            <Label>Awg {index + 1}</Label>
                            <Input className="form-control" type="number" value={valor} id={`awg${index + 1}`} disabled />
                        </Col>
                    ))

                }
            </Row>

            <Row>
                {
                    motor.fio.quantidades.map((qtd, index) => (

                        <Col className="col-md-2" key={index}>
                            <Label>Quantidade {index + 1}</Label>
                            <Input className="form-control" type="number" value={qtd} id={`qtd${index + 1}`} disabled />
                        </Col>

                    ))
                }

            </Row>
            <Row>
                {
                    motor.fio.espiras.map((esp, index) => (

                        <Col className="col-md-2" key={index}>
                            <Label>Espiras {index + 1}</Label>
                            <Input className="form-control" type="number" value={esp} id={`esp${index + 1}`} disabled />
                        </Col>
                    ))
                }
            </Row>
            <Row>
                <Row>
                    {
                        motor.amperagens.map((amp, index) => (
                            <Col key={index}>
                                <Label>Amperagem {index + 1}</Label>
                                <Input className="form-control" type="number" value={amp} id={`amp${index + 1}`} disabled />
                            </Col>
                        ))
                    }
                </Row>
                <Row>
                    {
                        motor.voltagens.map((amp, index) => (
                            <Col key={index}>
                                <Label>Voltagem {index + 1}</Label>
                                <Input className="form-control" type="number" value={amp} id={`amp${index + 1}`} disabled />
                            </Col>
                        ))
                    }
                </Row>
            </Row>

            <Row>
                <Col className="col-md-3">
                    <Label>Tensão</Label>
                    <Input name="tensao" value={motor.tensao} className="form-control" disabled />
                </Col>
                <Col className="col-md-5">
                    <Label>Ligação</Label>
                    <Input name="ligacao" value={motor.ligacao} type="text" className="form-control" disabled />

                </Col>
                <Col className="col-md-4">
                    <Label>Colaborador</Label>
                    <Input name="usuario" value={motor.usuario.login} type="text" className="form-control" disabled />
                </Col>
            </Row>

        </Dialog>
    );
}