import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { Modal, Row, Col, Form, Container } from 'react-bootstrap';
import { Image } from 'primereact/image';
import moment from "moment/moment";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ViewMotorDialog = (props) => {
    const { motor, visible, onHide } = props;
    const [showSchema, setShowSchema] = useState(false);
    const [key, setKey] = useState('trabalho');

    const handleToggleSchema = () => {
        setShowSchema(!showSchema);
    };

    const footer = (
        <Button label="Fechar" className="p-button-secondary mt-2" icon="pi pi-times" onClick={onHide} size="sm" />
    )

    return (
        <>
            <Container>
                <Modal
                    show={visible}
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
                                <Form.Label>Marca<span className="asteriscos">*</span> </Form.Label>
                                <Form.Control name="marca" value={motor.marca} type="text" size="sm" readOnly />
                            </Col>
                            <Col>
                                <Form.Label>Modelo</Form.Label>
                                <Form.Control name="modelo" value={motor.modelo} type="text" size="sm" readOnly />
                            </Col>
                            <Col>
                                <Form.Label>Ranhuras<span className="asteriscos">*</span></Form.Label>
                                <Form.Control name="ranhuras" value={motor.ranhuras} type="number" min={0} size="sm" readOnly />
                            </Col>
                            <Col>
                                <Form.Label>Rotação</Form.Label>
                                <Form.Control name="rotacao" value={motor.rotacao} type="number" min={0} size="sm" readOnly />
                            </Col>
                            <Col>
                                <Form.Label>Peso<span className="asteriscos">*</span></Form.Label>
                                <Form.Control name="peso" value={motor.peso} type="number" min={0} size="sm" readOnly />
                            </Col>
                            <Col>
                                <Form.Label>Potência</Form.Label>
                                <Form.Control name="potencia" value={motor.potencia} type="number" min={0} size="sm" readOnly />
                            </Col>
                        </Row>

                        <Row>
                            <Col className="col-md-2">
                                <Form.Label>Comprimento<span className="asteriscos">*</span></Form.Label>
                                <Form.Control name="comprimento" value={motor.comprimento} type="number" min={0} size="sm" readOnly />
                            </Col>
                            <Col className="col-md-2">
                                <Form.Label>M. Externa<span className="asteriscos">*</span></Form.Label>
                                <Form.Control name="medidaInterna" value={motor.medidaInterna} type="number" min={0} size="sm" readOnly />
                            </Col>
                            <Col className="col-md-6">
                                <Form.Label>Ligação<span className="asteriscos">*</span></Form.Label>
                                <Form.Control name="ligacao" value={motor.ligacao} type="text" min={0} size="sm" readOnly />
                            </Col>
                            <Col className="col-md-2">
                                <Form.Label>Empresa<span className="asteriscos">*</span></Form.Label>
                                <Form.Control name="empresa" value={motor.empresa || ''} type="text" size="sm" disabled />
                            </Col>

                        </Row>

                        <Row>
                            {motor.voltagens.map((volts, index) => (
                                <Col className="col-md-2" key={index}>
                                    <Form.Label>Voltagem</Form.Label>
                                    <Form.Control type="number" value={volts} id={`v${index + 1}`} size="sm" readOnly />
                                </Col>
                            ))}
                            <Col className="col-md-2">
                                <Form.Label>Tensão<span className="asteriscos">*</span></Form.Label>
                                <Form.Control name="tipoTensao" value={motor.tensao.tipoTensao} readOnly min={0} size="sm" />
                            </Col>

                        </Row>

                        {motor.tensao.tipoTensao === 'MONOFASICO' &&

                            <Tabs defaultActiveKey="profile"
                                id="uncontrolled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3 mt-2">

                                <Tab eventKey="trabalho" title="TRABALHO">
                                    <Row>
                                        {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'TRABALHO').map((bobina, bobinaIndex) => (
                                            <React.Fragment key={bobinaIndex}>
                                                {bobina.fio.awgs.map((valorAWG, index) => (
                                                    <Col className="col-md-2" key={index}>
                                                        <Form.Label>Awg<span className="asteriscos">*</span></Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            value={valorAWG}
                                                            min={0}
                                                            size="sm" readOnly />
                                                    </Col>
                                                ))}
                                            </React.Fragment>

                                        ))}
                                    </Row>
                                    <Row>
                                        {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'TRABALHO').map((bobina, bobinaIndex) => (
                                            <React.Fragment key={bobinaIndex}>
                                                {bobina.fio.quantidades.map((valorQTD, index) => (
                                                    <Col className="col-md-2" key={index}>
                                                        <Form.Label>Quantidade<span className="asteriscos">*</span></Form.Label>
                                                        <Form.Control type="number" value={valorQTD} id={`qtdTrab${index + 1}`} min={0} size="sm" readOnly />
                                                    </Col>
                                                ))}
                                            </React.Fragment>

                                        ))}
                                    </Row>
                                    <Row>
                                        {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'TRABALHO').map((bobina, bobinaIndex) => (
                                            <React.Fragment key={bobinaIndex}>
                                                {bobina.fio.espiras.map((valorESP, index) => (
                                                    <Col className="col-md-2" key={index}>
                                                        <Form.Label>Espiras<span className="asteriscos">*</span></Form.Label>
                                                        <Form.Control type="number" value={valorESP} id={`espTrab${index + 1}`} min={0} size="sm" readOnly />
                                                    </Col>
                                                ))}
                                            </React.Fragment>

                                        ))}
                                    </Row>
                                    <Row>
                                        {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'TRABALHO')
                                            .map((bobina, bobinaIndex) => (
                                                <React.Fragment key={bobinaIndex}>
                                                    {bobina.passo.map((valorPasso, index) => (
                                                        <Col className="col-md-1" key={index}>
                                                            <Form.Label>Passo<span className="asteriscos">*</span></Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                value={valorPasso}
                                                                id={`passoTrab${index + 1}`}
                                                                min={0}
                                                                size="sm"
                                                                readOnly
                                                            />
                                                        </Col>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                    </Row>

                                </Tab>

                                <Tab eventKey="auxiliar" title="AUXILIAR">
                                    <Row>
                                        {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'AUXILIAR').map((bobina, bobinaIndex) => (
                                            <React.Fragment key={bobinaIndex}>
                                                {bobina.fio.awgs.map((valorAWG, index) => (
                                                    <Col className="col-md-2" key={index}>
                                                        <Form.Label>Awg<span className="asteriscos">*</span></Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            value={valorAWG}
                                                            min={0}
                                                            size="sm" readOnly />
                                                    </Col>
                                                ))}
                                            </React.Fragment>

                                        ))}
                                    </Row>
                                    <Row>
                                        {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'AUXILIAR').map((bobina, bobinaIndex) => (
                                            <React.Fragment key={bobinaIndex}>
                                                {bobina.fio.quantidades.map((valorQTD, index) => (
                                                    <Col className="col-md-2" key={index}>
                                                        <Form.Label>Quantidade<span className="asteriscos">*</span></Form.Label>
                                                        <Form.Control type="number" value={valorQTD} id={`qtdTrab${index + 1}`} min={0} size="sm" readOnly />
                                                    </Col>
                                                ))}
                                            </React.Fragment>

                                        ))}
                                    </Row>
                                    <Row>
                                        {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'AUXILIAR').map((bobina, bobinaIndex) => (
                                            <React.Fragment key={bobinaIndex}>
                                                {bobina.fio.espiras.map((valorESP, index) => (
                                                    <Col className="col-md-2" key={index}>
                                                        <Form.Label>Espiras<span className="asteriscos">*</span></Form.Label>
                                                        <Form.Control type="number" value={valorESP} id={`espTrab${index + 1}`} min={0} size="sm" readOnly />
                                                    </Col>
                                                ))}
                                            </React.Fragment>

                                        ))}

                                    </Row>
                                    <Row>
                                        {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'AUXILIAR').map((bobina, bobinaIndex) => (
                                            <React.Fragment key={bobinaIndex}>
                                                {bobina.passo.map((valorPasso, index) => (
                                                    <Col className="col-md-1" key={index}>
                                                        <Form.Label>Passo<span className="asteriscos">*</span></Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            value={valorPasso} // Acessar o primeiro elemento do array passo
                                                            id={`passoAuxi${index + 1}`}
                                                            min={0}
                                                            size="sm"
                                                            readOnly
                                                        />
                                                    </Col>
                                                ))}
                                            </React.Fragment>
                                        ))}

                                    </Row>
                                </Tab>

                            </Tabs>

                        }

                        {motor.tensao.tipoTensao === 'TRIFASICO' &&
                            <>
                                <Row>
                                    {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'UNICO').map((bobina, bobinaIndex) => (
                                        <React.Fragment key={bobinaIndex}>
                                            {bobina.fio.awgs.map((valorAWG, index) => (
                                                <Col className="col-md-2" key={index}>
                                                    <Form.Label>Awg<span className="asteriscos">*</span></Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={valorAWG}
                                                        min={0}
                                                        size="sm" readOnly />
                                                </Col>
                                            ))}
                                        </React.Fragment>

                                    ))}
                                </Row>
                                <Row>
                                    {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'UNICO').map((bobina, bobinaIndex) => (
                                        <React.Fragment key={bobinaIndex}>
                                            {bobina.fio.quantidades.map((valorQTD, index) => (
                                                <Col className="col-md-2" key={index}>
                                                    <Form.Label>Quantidade<span className="asteriscos">*</span></Form.Label>
                                                    <Form.Control type="number" value={valorQTD} id={`qtdUnico${index + 1}`} min={0} size="sm" readOnly />
                                                </Col>
                                            ))}
                                        </React.Fragment>

                                    ))}
                                </Row>
                                <Row>
                                    {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'UNICO').map((bobina, bobinaIndex) => (
                                        <React.Fragment key={bobinaIndex}>
                                            {bobina.fio.espiras.map((valorESP, index) => (
                                                <Col className="col-md-2" key={index}>
                                                    <Form.Label>Espiras<span className="asteriscos">*</span></Form.Label>
                                                    <Form.Control type="number" value={valorESP} id={`espTrab${index + 1}`} min={0} size="sm" readOnly />
                                                </Col>
                                            ))}
                                        </React.Fragment>

                                    ))}
                                </Row>
                                <Row>
                                    {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'UNICO').map((bobina, bobinaIndex) => (
                                        <React.Fragment key={bobinaIndex}>
                                            {bobina.passo.map((valorPasso, index) => (
                                                <Col className="col-md-1" key={index}>
                                                    <Form.Label>Passo<span className="asteriscos">*</span></Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={valorPasso} // Acessar o primeiro elemento do array passo
                                                        id={`passoUnico${index + 1}`}
                                                        min={0}
                                                        size="sm"
                                                        readOnly
                                                    />
                                                </Col>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </Row>
                            </>}
                        <Row>
                            <Form.Label>Esquema </Form.Label>
                            <Col className="mt-2">
                                <Button className='custom-choose-btn p-button-rounded ' icon='pi pi-fw pi-images' tooltip="Visualizar esquema" size="sm" onClick={handleToggleSchema} />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>{footer}</Modal.Footer>
                </Modal>
            </Container>

            <Dialog header="Esquema" visible={showSchema} style={{ width: '35vw' }} onHide={handleToggleSchema}>
                {motor.imagem.dados ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src={`data:${motor.imagem.tipo};base64,${motor.imagem.dados}`} loading="lazy" alt={motor.imagem.nome} preview width="250" />
                    </div>
                ) : (
                    <p style={{ color: "black" }}>{"Nenhuma imagem anexada"}</p>
                )}
            </Dialog>

        </>
    );
}
export default ViewMotorDialog;