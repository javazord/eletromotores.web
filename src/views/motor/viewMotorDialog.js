import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Image } from 'primereact/image';
import moment from "moment/moment";

const ViewMotorDialog = (props) => {
    const { motor, visible, onHide } = props;
    const [showSchema, setShowSchema] = useState(false);

    const handleToggleSchema = () => {
        setShowSchema(!showSchema);
    };

    const footer = (
        <Button label="Fechar" className="p-button-secondary mt-2" icon="pi pi-times" onClick={onHide} size="sm" />
    )
    return (
        <>
            <Modal
                show={visible}
                modal={false}
                onHide={onHide}
                centered
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Registrado em {moment(motor.registro).format('DD/MM/YYYY')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Label>Marca</Form.Label>
                            <Form.Control name="marca" value={motor.marca || ''} type="text" bsSize="sm" disabled />
                        </Col>
                        <Col>
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control name="modelo" value={motor.modelo || ''} type="text" bsSize="sm" disabled />
                        </Col>
                        <Col>
                            <Form.Label>Ranhuras</Form.Label>
                            <Form.Control name="ranhuras" value={motor.ranhuras || ''} type="number" bsSize="sm" disabled />
                        </Col>
                        <Col>
                            <Form.Label>Rotação</Form.Label>
                            <Form.Control name="rotacao" value={motor.rotacao || ''} type="number" bsSize="sm" disabled />
                        </Col>
                        <Col>
                            <Form.Label>Peso</Form.Label>
                            <Form.Control id="peso" value={motor.fio.peso.toFixed(3)} type="number" bsSize="sm" disabled />
                        </Col>
                        <Col>
                            <Form.Label>Potência</Form.Label>
                            <Form.Control name="potencia" value={motor.potencia || ''} type="number" bsSize="sm" disabled />
                        </Col>
                    </Row>

                    <Row>

                        <Col className="col-md-2">
                            <Form.Label>Comprimento</Form.Label>
                            <Form.Control name="comprimento" value={motor.comprimento || ''} type="number" min="1" bsSize="sm" disabled />
                        </Col>
                        <Col className="col-md-2">
                            <Form.Label>M. Externa</Form.Label>
                            <Form.Control name="medidaExterna" value={motor.medidaExterna || ''} type="number" bsSize="sm" disabled />
                        </Col>
                        {motor.passo.map((valor, index) => (
                            <Col className="col-md-1" key={index}>
                                <Form.Label>Passo</Form.Label>
                                <Form.Control type="number" value={valor} id={`passo${index + 1}`} bsSize="sm" disabled />
                            </Col>

                        ))}
                    </Row>

                    <Row>
                        {motor.fio.awgs.map((valor, index) => (
                            <Col className="col-md-2" key={index}>
                                <Form.Label>Awg</Form.Label>
                                <Form.Control type="number" value={valor} id={`awg${index + 1}`} bsSize="sm" disabled />
                            </Col>
                        ))}
                    </Row>

                    <Row>
                        {motor.fio.quantidades.map((qtd, index) => (

                            <Col className="col-md-2" key={index}>
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control type="number" value={qtd} id={`qtd${index + 1}`} bsSize="sm" disabled />
                            </Col>

                        ))}

                    </Row>
                    <Row>
                        {motor.fio.espiras.map((esp, index) => (

                            <Col className="col-md-2" key={index}>
                                <Form.Label>Espiras</Form.Label>
                                <Form.Control type="number" value={esp} id={`esp${index + 1}`} bsSize="sm" disabled />
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        {motor.voltagens.map((volts, index) => (
                            <Col className="col-md-2" key={index}>
                                <Form.Label>Voltagem</Form.Label>
                                <Form.Control type="number" value={volts} id={`v${index + 1}`} bsSize="sm" disabled />
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        {motor.amperagens.map((amp, index) => (
                            <Col className="col-md-2" key={index}>
                                <Form.Label>Amperagem </Form.Label>
                                <Form.Control type="number" value={amp} id={`amp${index + 1}`} bsSize="sm" disabled />
                            </Col>
                        ))}
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label>Tensão</Form.Label>
                            <Form.Control name="tensao" value={motor.tensao || ''} type="text" bsSize="sm" disabled />
                        </Col>
                        <Col className="col-md-6">
                            <Form.Label>Ligação</Form.Label>
                            <Form.Control name="ligacao" value={motor.ligacao || ''} type="text" bsSize="sm" disabled />
                        </Col>
                        <Col>
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control name="empresa" value={motor.empresa || ''} type="text" bsSize="sm" disabled />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label>Esquema </Form.Label>
                        <Col className="mt-2">
                            <Button className='custom-choose-btn p-button-rounded ' icon='pi pi-fw pi-images' tooltip="Visualizar esquema" size="sm" onClick={handleToggleSchema} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>{footer}</Modal.Footer>

            </Modal>

            <Dialog header="Esquema" visible={showSchema} style={{ width: '35vw' }} onHide={handleToggleSchema}>
                {motor.imagem.dados ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src={`data:${motor.imagem.tipo};base64,${motor.imagem.dados}`} loading="lazy" alt={motor.imagem.nome} preview width="250" />
                    </div>
                ) : (
                    <p>{"Nenhuma imagem anexada"}</p>
                )}
            </Dialog>

        </>
    );
}
export default ViewMotorDialog;