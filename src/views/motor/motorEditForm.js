import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Toast } from "primereact/toast";
import Checkbox from "../../components/grid/checkbox";
import { Button } from 'primereact/button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const MotorEditForm = (props) => {

    const {
        visible,
        onHide,
        motor,
        checkboxVolts,
        addInputsESP,
        addInputsPasso,
        addInputs,
        removeInputs,
        handleInputChange,
        handleChangePasso,
        handleChangeAWG,
        handleChangeQuantidade,
        handleChangeEspiras,
        handleCheckboxChange,
        handleFileChange,
        empresas,
        footer,
        toast
    } = props;
    const [newMotor, setNewMotor] = useState(motor);
    const [key, setKey] = useState('trabalho');
    useEffect(() => {
        setNewMotor(motor);
    }, [motor]);

    return (
        <Modal
            show={visible}
            onHide={onHide}
            centered
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>Editar Motor</Modal.Title>
            </Modal.Header>
            <Modal.Body><Row>
                <Col>
                    <Form.Label>Marca<span className="asteriscos">*</span> </Form.Label>
                    <Form.Control name="marca" value={motor.marca} onChange={handleInputChange} type="text" size="sm" />
                </Col>
                <Col>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control name="modelo" value={motor.modelo} onChange={handleInputChange} type="text" size="sm" />
                </Col>
                <Col>
                    <Form.Label>Ranhuras<span className="asteriscos">*</span></Form.Label>
                    <Form.Control name="ranhuras" value={motor.ranhuras} onChange={handleInputChange} type="number" min={0} size="sm" />
                </Col>
                <Col>
                    <Form.Label>Rotação</Form.Label>
                    <Form.Control name="rotacao" value={motor.rotacao} onChange={handleInputChange} type="number" min={0} size="sm" />
                </Col>
                <Col>
                    <Form.Label>Peso<span className="asteriscos">*</span></Form.Label>
                    <Form.Control name="peso" value={motor.peso} onChange={handleInputChange} type="number" min={0} size="sm" />
                </Col>
                <Col>
                    <Form.Label>Potência</Form.Label>
                    <Form.Control name="potencia" value={motor.potencia} onChange={handleInputChange} type="number" min={0} size="sm" />
                </Col>
            </Row>

                <Row>
                    <Col className="col-md-2">
                        <Form.Label>Comprimento<span className="asteriscos">*</span></Form.Label>
                        <Form.Control name="comprimento" value={motor.comprimento} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                    <Col className="col-md-2">
                        <Form.Label>M. Externa<span className="asteriscos">*</span></Form.Label>
                        <Form.Control name="medidaInterna" value={motor.medidaInterna} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                    <Col className="col-md-6">
                        <Form.Label>Ligação<span className="asteriscos">*</span></Form.Label>
                        <Form.Control name="ligacao" value={motor.ligacao} onChange={handleInputChange} type="text" min={0} size="sm" />
                    </Col>
                    <Col className="col-md-2">
                        <Form.Label>Empresa<span className="asteriscos">*</span></Form.Label>
                        <select name="empresa" value={motor.empresa} onChange={handleInputChange} className="form-select form-select-sm">
                            <option value="">Selecione uma empresa</option>
                            {empresas.map((empresa) => (
                                <option key={empresa.valor} value={empresa.valor}>{empresa.descricao}</option>
                            ))}
                        </select>
                    </Col>

                </Row>

                <Row>
                    {checkboxVolts.map((checkbox, index) => (
                        <div className="col-md-2" key={index}>
                            <Form.Label>Voltagem<span className="asteriscos">*</span></Form.Label>
                            <Checkbox
                                label={`${checkbox.volts}v`} checked={checkbox.checked}
                                onChange={(e) => handleCheckboxChange(index, e.target.checked)} />
                            {motor.voltagens.includes(checkbox.volts) && (
                                <><Form.Label>Amperagem</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        value={motor.amperagens[motor.voltagens.indexOf(checkbox.volts)]}
                                        min={0}
                                        onChange={(e) => {
                                            const updatedMotor = { ...motor };
                                            const value = e.target.value !== '' ? Number(e.target.value) : '';
                                            updatedMotor.amperagens[newMotor.voltagens.indexOf(checkbox.volts)] = value;
                                            setNewMotor(updatedMotor);
                                        }} />

                                </>
                            )}
                        </div>
                    ))}
                    <Col className="col-md-2">
                        <Form.Label>Tensão<span className="asteriscos">*</span></Form.Label>
                        <Form.Control name="tipoTensao" value={motor.tensao.tipoTensao} disabled min={0} size="sm" />
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
                                    <React.Fragment key={bobina[bobinaIndex].id}>
                                        {bobina.fio.awgs.map((valorAWG, index) => (
                                            <Col className="col-md-2" key={index}>
                                                <Form.Label>Awg<span className="asteriscos">*</span></Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={valorAWG}
                                                    onChange={(e) => handleChangeAWG(e, index, 'TRABALHO')}
                                                    min={0}
                                                    size="sm" />
                                            </Col>
                                        ))}
                                    </React.Fragment>

                                ))}

                                <Col className="col-md-2 mt-2 d-flex align-items-end">
                                    <Button icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar AWG/Quantidade" size="sm" onClick={(e) => addInputs('TRABALHO')} />
                                </Col>
                            </Row>
                            <Row>
                                {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'TRABALHO').map((bobina, bobinaIndex) => (
                                    <React.Fragment key={bobina[bobinaIndex].id}>
                                        {bobina.fio.quantidades.map((valorQTD, index) => (
                                            <Col className="col-md-2" key={index}>
                                                <Form.Label>Quantidade<span className="asteriscos">*</span></Form.Label>
                                                <Form.Control type="number" value={valorQTD} id={`qtdTrab${index + 1}`} onChange={(e) => handleChangeQuantidade(e, index, 'TRABALHO')} min={0} size="sm" />
                                            </Col>
                                        ))}
                                    </React.Fragment>

                                ))}

                                <Col className="col-md-2 mt-2 d-flex align-items-end">
                                    <Button icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover AWG/Quantidade" size="sm" onClick={() => removeInputs('TRABALHO', ['awgs', 'quantidades'])} />
                                </Col>
                            </Row>
                            <Row>
                                {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'TRABALHO').map((bobina, bobinaIndex) => (
                                    <React.Fragment key={bobinaIndex}>
                                        {bobina.fio.espiras.map((valorESP, index) => (
                                            <Col className="col-md-2" key={index}>
                                                <Form.Label>Espiras<span className="asteriscos">*</span></Form.Label>
                                                <Form.Control type="number" value={valorESP} id={`espTrab${index + 1}`} onChange={(e) => handleChangeEspiras(e, index, 'TRABALHO')} min={0} size="sm" />
                                            </Col>
                                        ))}
                                    </React.Fragment>

                                ))}
                                <Col className="col-2 mt-2 d-flex align-items-end">
                                    <Button className="me-1" icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar Espiras" onClick={() => addInputsESP('TRABALHO')} size="small" />
                                    <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Espiras" onClick={() => removeInputs('TRABALHO', 'espiras')} size="small" />
                                </Col>
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
                                                        onChange={(e) => handleChangePasso(e, index, 'TRABALHO')}
                                                        min={0}
                                                        size="sm"
                                                    />
                                                </Col>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                <Col className="col-2 mt-2 d-flex align-items-end">
                                    <Button className="me-1" icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar Passo" onClick={() => addInputsPasso('TRABALHO')} size="sm" />
                                    <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Passo" onClick={() => removeInputs('TRABALHO', 'passo')} size="sm" />
                                </Col>
                            </Row>

                        </Tab>

                        <Tab eventKey="auxiliar" title="AUXILIAR">
                            <Row>
                                {newMotor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'AUXILIAR').map((bobina, bobinaIndex) => (
                                    <React.Fragment key={bobinaIndex}>
                                        {bobina.fio.awgs.map((valorAWG, index) => (
                                            <Col className="col-md-2" key={index}>
                                                <Form.Label>Awg<span className="asteriscos">*</span></Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={valorAWG}
                                                    onChange={(e) => handleChangeAWG(e, index, 'AUXILIAR')}
                                                    min={0}
                                                    size="sm" />
                                            </Col>
                                        ))}
                                    </React.Fragment>

                                ))}

                                <Col className="col-md-2 mt-2 d-flex align-items-end">
                                    <Button icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar AWG/Quantidade" size="sm" onClick={() => addInputs('AUXILIAR')} />
                                </Col>
                            </Row>
                            <Row>
                                {newMotor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'AUXILIAR').map((bobina, bobinaIndex) => (
                                    <React.Fragment key={bobinaIndex}>
                                        {bobina.fio.quantidades.map((valorQTD, index) => (
                                            <Col className="col-md-2" key={index}>
                                                <Form.Label>Quantidade<span className="asteriscos">*</span></Form.Label>
                                                <Form.Control type="number" value={valorQTD} id={`qtdTrab${index + 1}`} onChange={(e) => handleChangeQuantidade(e, index, 'AUXILIAR')} min={0} size="sm" />
                                            </Col>
                                        ))}
                                    </React.Fragment>

                                ))}

                                <Col className="col-md-2 mt-2 d-flex align-items-end">
                                    <Button icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover AWG/Quantidade" size="sm" onClick={() => removeInputs('AUXILIAR', ['awgs', 'quantidades'])} />
                                </Col>
                            </Row>
                            <Row>
                                {newMotor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'AUXILIAR').map((bobina, bobinaIndex) => (
                                    <React.Fragment key={bobinaIndex}>
                                        {bobina.fio.espiras.map((valorESP, index) => (
                                            <Col className="col-md-2" key={index}>
                                                <Form.Label>Espiras<span className="asteriscos">*</span></Form.Label>
                                                <Form.Control type="number" value={valorESP} id={`espTrab${index + 1}`} onChange={(e) => handleChangeEspiras(e, index, 'AUXILIAR')} min={0} size="sm" />
                                            </Col>
                                        ))}
                                    </React.Fragment>

                                ))}
                                <Col className="col-2 mt-2 d-flex align-items-end">
                                    <Button className="me-1" icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar Espiras" onClick={() => addInputsESP('AUXILIAR')} size="small" />
                                    <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Espiras" onClick={() => removeInputs('AUXILIAR', 'espiras')} size="small" />
                                </Col>

                            </Row>
                            <Row>
                                {newMotor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'AUXILIAR').map((bobina, bobinaIndex) => (
                                    <React.Fragment key={bobinaIndex}>
                                        {bobina.passo.map((valorPasso, index) => (
                                            <Col className="col-md-1" key={index}>
                                                <Form.Label>Passo<span className="asteriscos">*</span></Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={valorPasso} // Acessar o primeiro elemento do array passo
                                                    id={`passoAuxi${index + 1}`}
                                                    onChange={(e) => handleChangePasso(e, index, 'AUXILIAR')}
                                                    min={0}
                                                    size="sm"
                                                />
                                            </Col>
                                        ))}
                                    </React.Fragment>
                                ))}

                                <Col className="col-2 mt-2 d-flex align-items-end">
                                    <Button className="me-1" icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar Passo" onClick={() => addInputsPasso('AUXILIAR')} size="sm" />
                                    <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Passo" onClick={() => removeInputs('AUXILIAR', 'passo')} size="sm" />
                                </Col>
                            </Row>
                        </Tab>

                    </Tabs>

                }

                {newMotor.tensao.tipoTensao === 'TRIFASICO' &&
                    <>
                        <Row>
                            {newMotor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'UNICO').map((bobina, bobinaIndex) => (
                                <React.Fragment key={bobinaIndex}>
                                    {bobina.fio.awgs.map((valorAWG, index) => (
                                        <Col className="col-md-2" key={index}>
                                            <Form.Label>Awg<span className="asteriscos">*</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={valorAWG}
                                                onChange={(e) => handleChangeAWG(e, index, 'UNICO')}
                                                min={0}
                                                size="sm" />
                                        </Col>
                                    ))}
                                </React.Fragment>

                            ))}

                            <Col className="col-md-2 mt-2 d-flex align-items-end">
                                <Button icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar AWG/Quantidade" size="sm" onClick={() => addInputs('UNICO')} />
                            </Col>
                        </Row>
                        <Row>
                            {newMotor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'UNICO').map((bobina, bobinaIndex) => (
                                <React.Fragment key={bobinaIndex}>
                                    {bobina.fio.quantidades.map((valorQTD, index) => (
                                        <Col className="col-md-2" key={index}>
                                            <Form.Label>Quantidade<span className="asteriscos">*</span></Form.Label>
                                            <Form.Control type="number" value={valorQTD} id={`qtdUnico${index + 1}`} onChange={(e) => handleChangeQuantidade(e, index, 'UNICO')} min={0} size="sm" />
                                        </Col>
                                    ))}
                                </React.Fragment>

                            ))}

                            <Col className="col-md-2 mt-2 d-flex align-items-end">
                                <Button icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover AWG/Quantidade" size="sm" onClick={() => removeInputs('UNICO', ['awgs', 'quantidades'])} />
                            </Col>
                        </Row>
                        <Row>
                            {newMotor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'UNICO').map((bobina, bobinaIndex) => (
                                <React.Fragment key={bobinaIndex}>
                                    {bobina.fio.espiras.map((valorESP, index) => (
                                        <Col className="col-md-2" key={index}>
                                            <Form.Label>Espiras<span className="asteriscos">*</span></Form.Label>
                                            <Form.Control type="number" value={valorESP} id={`espTrab${index + 1}`} onChange={(e) => handleChangeEspiras(e, index, 'UNICO')} min={0} size="sm" />
                                        </Col>
                                    ))}
                                </React.Fragment>

                            ))}
                            <Col className="col-2 mt-2 d-flex align-items-end">
                                <Button className="me-1" icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar Espiras" onClick={() => addInputsESP('UNICO')} size="small" />
                                <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Espiras" onClick={() => removeInputs('UNICO', 'espiras')} size="small" />
                            </Col>
                        </Row>
                        <Row>
                            {newMotor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'UNICO').map((bobina, bobinaIndex) => (
                                <React.Fragment key={bobinaIndex}>
                                    {bobina.passo.map((valorPasso, index) => (
                                        <Col className="col-md-1" key={index}>
                                            <Form.Label>Passo<span className="asteriscos">*</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={valorPasso} // Acessar o primeiro elemento do array passo
                                                id={`passoUnico${index + 1}`}
                                                onChange={(e) => handleChangePasso(e, index, 'UNICO')}
                                                min={0}
                                                size="sm"
                                            />
                                        </Col>
                                    ))}
                                </React.Fragment>
                            ))}
                            <Col className="col-2 mt-2 d-flex align-items-end">
                                <Button className="me-1" icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar Passo" onClick={() => addInputsPasso('UNICO')} size="sm" />
                                <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Passo" onClick={() => removeInputs('UNICO', 'passo')} size="sm" />
                            </Col>
                        </Row></>
                }

                <Row>
                    <Col className="col-md-6 mt-2">
                        <Form.Label>Esquema</Form.Label>
                        <Form.Control type={"file"} name="file" id="fileInput" accept={".jpg, .png"} onChange={handleFileChange} size="sm" />
                    </Col>
                </Row>

                <Col className="justify-content-start mt-2">
                    <small>
                        Itens marcados com <label><span className="asteriscos">*</span></label> são obrigatórios
                    </small>
                </Col>
            </Modal.Body>

            <Modal.Footer>{footer}</Modal.Footer>
            <Toast ref={toast} />
        </Modal>
    );
}

export default MotorEditForm;