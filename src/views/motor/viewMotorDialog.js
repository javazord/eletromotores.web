import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { Col, Row, Input, Label } from "reactstrap";
import { ImagemService } from "../../app/service/imagem/imagemService";

export default function ViewMotorDialog(props) {
    const { motor, visible, onHide } = props;
    const [imagem, setImagem] = useState();
    const [showSchema, setShowSchema] = useState(false);
    const service = new ImagemService();

    useEffect(() => {
        if (motor) {
            service.search(motor.id)
                .then(response => {
                    console.log(response.data)
                })
        }
    })

    const footer = (
        <Button label="Fechar" className="p-button-secondary mt-2" icon="pi pi-times" onClick={onHide} size="sm" />
    )

    return (

        <>
            <Dialog
                header={`Registrado em ${new Intl.DateTimeFormat('pt-BR').format(motor.registro)}`}
                visible={visible}
                modal={false}
                style={{ width: '65vw' }}
                onHide={onHide} // Passa a propriedade onHide para o componente Dialog
                footer={footer}
            >
                <Row>
                    <Col>
                        <Label>Marca</Label>
                        <Input name="marca" value={motor.marca} type="text" bsSize="sm" disabled />
                    </Col>
                    <Col>
                        <Label>Modelo</Label>
                        <Input name="modelo" value={motor.modelo} type="text" bsSize="sm" disabled />
                    </Col>
                    <Col>
                        <Label>Ranhuras</Label>
                        <Input name="ranhuras" value={motor.ranhuras} type="number" bsSize="sm" disabled />
                    </Col>
                    <Col>
                        <Label>Rotação</Label>
                        <Input name="rotacao" value={motor.rotacao} type="number" bsSize="sm" disabled />
                    </Col>
                    <Col>
                        <Label>Peso</Label>
                        <Input id="peso" value={motor.fio.peso} type="number" bsSize="sm" disabled />
                    </Col>
                    <Col>
                        <Label>Potência</Label>
                        <Input name="potencia" value={motor.potencia} type="number" bsSize="sm" disabled />
                    </Col>
                </Row>

                <Row>

                    <Col className="col-md-2">
                        <Label>Comprimento</Label>
                        <Input name="comprimento" value={motor.comprimento} type="number" min="1" bsSize="sm" disabled />
                    </Col>
                    <Col className="col-md-2">
                        <Label>Medida Externa</Label>
                        <Input name="medidaExterna" value={motor.medidaExterna} type="number" bsSize="sm" disabled />
                    </Col>
                    {motor.passo.map((valor, index) => (
                        <Col className="col-md-1" key={index}>
                            <Label>Passo</Label>
                            <Input type="number" value={valor} id={`passo${index + 1}`} bsSize="sm" disabled />
                        </Col>

                    ))}
                </Row>

                <Row>
                    {motor.fio.awgs.map((valor, index) => (
                        <Col className="col-md-2" key={index}>
                            <Label>Awg</Label>
                            <Input type="number" value={valor} id={`awg${index + 1}`} bsSize="sm" disabled />
                        </Col>
                    ))}
                </Row>

                <Row>
                    {motor.fio.quantidades.map((qtd, index) => (

                        <Col className="col-md-2" key={index}>
                            <Label>Quantidade</Label>
                            <Input type="number" value={qtd} id={`qtd${index + 1}`} bsSize="sm" disabled />
                        </Col>

                    ))}

                </Row>
                <Row>
                    {motor.fio.espiras.map((esp, index) => (

                        <Col className="col-md-2" key={index}>
                            <Label>Espiras</Label>
                            <Input type="number" value={esp} id={`esp${index + 1}`} bsSize="sm" disabled />
                        </Col>
                    ))}
                </Row>
                <Row>
                    {motor.voltagens.map((volts, index) => (
                        <Col key={index}>
                            <Label>Voltagem</Label>
                            <Input type="number" value={volts} id={`v${index + 1}`} bsSize="sm" disabled />
                        </Col>
                    ))}
                </Row>
                <Row>
                    {motor.amperagens.map((amp, index) => (
                        <Col key={index}>
                            <Label>Amperagem </Label>
                            <Input type="number" value={amp} id={`amp${index + 1}`} bsSize="sm" disabled />
                        </Col>
                    ))}
                </Row>

                <Row>
                    <Col>
                        <Label>Tensão</Label>
                        <Input name="tensao" value={motor.tensao} type="text" bsSize="sm" disabled />
                    </Col>
                    <Col className="col-md-6">
                        <Label>Ligação</Label>
                        <Input name="ligacao" value={motor.ligacao} type="text" bsSize="sm" disabled />
                    </Col>
                    <Col>
                        <Label>Empresa</Label>
                        <Input name="empresa" value={motor.empresa} type="text" bsSize="sm" disabled />
                    </Col>
                </Row>
                <Row>
                    <Label>Esquema </Label>
                    <Col>
                        <Button label="Visualizar" size="sm" onClick={() => setShowSchema(true)} />
                    </Col>
                </Row>

            </Dialog>

            <Dialog header="Header" visible={showSchema} style={{ width: '75vw' }} onHide={() => setShowSchema(false)}>
                teste
            </Dialog>
        </>
    );
}