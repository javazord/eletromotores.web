import React, { useState } from "react";
import { Card, Form, Row, Col } from 'react-bootstrap';
import { Button } from 'primereact/button';
import Checkbox from "../../components/grid/checkbox";
import { Toast } from "primereact/toast";

const MotorForm = (props) => {
    const {
        motor,
        checkboxVolts,
        addInputsESP,
        removeInputsESP,
        handleInputChange,
        handleChangePasso,
        handleInputChangePeso,
        addInputsPasso,
        removeInputsPasso,
        addInputs,
        removeInputs,
        handleChangeAWG,
        handleChangeQTD,
        handleChangeESP,
        handleCheckboxChange,
        handleFileChange,
        empresas,
        create,
        loading,
        toast,
    } = props;

    const [newMotor, setNewMotor] = useState(motor);

    const footer = (
        <div className="d-flex justify-content-end">
            <Button onClick={create} label="Cadastrar" icon="pi pi-check" size="sm" loading={loading} />

        </div>
    )

    return (
        <><Card>
            <Card.Header as="h5">Cadastrar Motor</Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <Form.Label>Marca<span>*</span> </Form.Label>
                        <Form.Control name="marca" value={motor.marca} onChange={handleInputChange} type="text" size="sm" />
                    </Col>
                    <Col>
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control name="modelo" value={motor.modelo} onChange={handleInputChange} type="text" size="sm" />
                    </Col>
                    <Col>
                        <Form.Label>Ranhuras<span>*</span></Form.Label>
                        <Form.Control name="ranhuras" value={motor.ranhuras} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                    <Col>
                        <Form.Label>Rotação</Form.Label>
                        <Form.Control name="rotacao" value={motor.rotacao} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                    <Col>
                        <Form.Label>Peso<span>*</span></Form.Label>
                        <Form.Control name="peso" value={motor.fio.peso} onChange={handleInputChangePeso} type="number" min={0} size="sm" />
                    </Col>
                    <Col>
                        <Form.Label>Potência</Form.Label>
                        <Form.Control name="potencia" value={motor.potencia} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                </Row>

                <Row>
                    <Col className="col-md-2">
                        <Form.Label>Comprimento<span>*</span></Form.Label>
                        <Form.Control name="comprimento" value={motor.comprimento} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                    <Col className="col-md-2">
                        <Form.Label>M. Externa<span>*</span></Form.Label>
                        <Form.Control name="medidaExterna" value={motor.medidaExterna} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                    {motor.passo.map((passo, index) => (

                        <Col className="col-md-1" key={index}>
                            <Form.Label>Passo<span>*</span></Form.Label>
                            <Form.Control type="number" value={passo} id={`passo${index + 1}`} onChange={(e) => handleChangePasso(e, index)} min={0} size="sm" />
                        </Col>

                    ))}
                    <Col className="col-2 mt-2 d-flex align-items-end">
                        <Button className="me-1" icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar Passo" onClick={addInputsPasso} size="sm" />
                        <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Passo" onClick={removeInputsPasso} size="sm" />
                    </Col>
                </Row>

                <Row>
                    {motor.fio.awgs.map((valor, index) => (
                        <Col className="col-md-2" key={index}>
                            <Form.Label>Awg<span>*</span></Form.Label>
                            <Form.Control type="number" value={valor} onChange={(e) => handleChangeAWG(e, index)} min={0} size="sm" />
                        </Col>
                    ))}

                    <Col className="col-md-2 mt-2 d-flex align-items-end">
                        <Button icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar AWG/Quantidade" size="sm" onClick={addInputs} />
                    </Col>
                </Row>

                <Row>
                    {motor.fio.quantidades.map((qtd, index) => (

                        <Col className="col-md-2" key={index}>
                            <Form.Label>Quantidade<span>*</span></Form.Label>
                            <Form.Control type="number" value={qtd} id={`qtd${index + 1}`} onChange={(e) => handleChangeQTD(e, index)} min={0} size="sm" />
                        </Col>

                    ))}

                    <Col className="col-md-2 mt-2 d-flex align-items-end">
                        <Button icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover AWG/Quantidade" size="sm" onClick={removeInputs} />
                    </Col>
                </Row>
                <Row>
                    {motor.fio.espiras.map((esp, index) => (

                        <Col className="col-md-2" key={index}>
                            <Form.Label>Espiras<span>*</span></Form.Label>
                            <Form.Control type="number" value={esp} id={`esp${index + 1}`} onChange={(e) => handleChangeESP(e, index)} min={0} size="sm" />
                        </Col>

                    ))}
                    <Col className="col-2 mt-2 d-flex align-items-end">
                        <Button className="me-1" icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar Espiras" onClick={addInputsESP} size="small" />
                        <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Espiras" onClick={removeInputsESP} size="small" />
                    </Col>

                </Row>
                <Row className="mt-2">
                    {checkboxVolts.map((checkbox, index) => (
                        <div className="col-md-2" key={index}>
                            <Form.Label>Voltagem<span>*</span></Form.Label>
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
                                            const updatedMotor = { ...newMotor };
                                            const value = e.target.value !== '' ? Number(e.target.value) : '';
                                            updatedMotor.amperagens[newMotor.voltagens.indexOf(checkbox.volts)] = value;
                                            setNewMotor(updatedMotor);
                                        }} />

                                </>
                            )}
                        </div>
                    ))}

                </Row>

                <Row>
                    <Col className="col-md-3">
                        <Form.Label>Tensão<span>*</span></Form.Label>
                        <Form.Control name="tensao" value={motor.tensao} disabled min={0} size="sm" />
                    </Col>
                    <Col className="col-md-5">
                        <Form.Label>Ligação<span>*</span></Form.Label>
                        <Form.Control name="ligacao" value={motor.ligacao} onChange={handleInputChange} type="text" min={0} size="sm" />
                    </Col>
                    <Col className="col-md-4">
                        <Form.Label>Empresa<span>*</span></Form.Label>
                        <select name="empresa" value={motor.empresa} onChange={handleInputChange} className="form-select form-select-sm">
                            <option value="">Selecione uma empresa</option>
                            {empresas.map((empresa) => (
                                <option key={empresa.valor} value={empresa.valor}>{empresa.descricao}</option>
                            ))}
                        </select>
                    </Col>
                </Row>

                <Row>
                    <Col className="col-md-6 mt-2">
                        <Form.Label>Esquema</Form.Label>
                        <Form.Control type={"file"} name="file" id="fileInput" accept={".jpg, .png"} onChange={handleFileChange} size="sm" />
                    </Col>
                </Row>

                <Col className="justify-content-start mt-2">
                    <small>
                        Itens marcados com <label><span>*</span></label> são obrigatórios
                    </small>
                </Col>


            </Card.Body>
            <Card.Footer>{footer}</Card.Footer>
        </Card><Toast ref={toast} /></>
    );
}

export default MotorForm;
