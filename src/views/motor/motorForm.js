import React, { useState } from "react";
import { Container, Row, Col, Input, Label } from 'reactstrap';
import { Card } from "primereact/card";
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

    return (
        <Card title={"Cadastrar Motor"} >
            <Row>
                <Col >
                    <Label>Marca<span>*</span> </Label>
                    <Input name="marca" value={motor.marca} onChange={handleInputChange} type="text" bsSize="sm" />
                </Col>
                <Col>
                    <Label>Modelo</Label>
                    <Input name="modelo" value={motor.modelo} onChange={handleInputChange} type="text" bsSize="sm" />
                </Col>
                <Col>
                    <Label>Ranhuras<span>*</span></Label>
                    <Input name="ranhuras" value={motor.ranhuras} onChange={handleInputChange} type="number" min={0} bsSize="sm" />
                </Col>
                <Col>
                    <Label>Rotação</Label>
                    <Input name="rotacao" value={motor.rotacao} onChange={handleInputChange} type="number" min={0} bsSize="sm" />
                </Col>
                <Col>
                    <Label>Peso<span>*</span></Label>
                    <Input name="peso" value={motor.fio.peso} onChange={handleInputChangePeso} type="number" min={0} bsSize="sm" />
                </Col>
                <Col>
                    <Label>Potência</Label>
                    <Input name="potencia" value={motor.potencia} onChange={handleInputChange} type="number" min={0} bsSize="sm" />
                </Col>
            </Row>

            <Row>
                <Col className="col-md-2">
                    <Label>Comprimento<span>*</span></Label>
                    <Input name="comprimento" value={motor.comprimento} onChange={handleInputChange} type="number" min={0} bsSize="sm" />
                </Col>
                <Col className="col-md-2">
                    <Label>M. Externa<span>*</span></Label>
                    <Input name="medidaExterna" value={motor.medidaExterna} onChange={handleInputChange} type="number" min={0} bsSize="sm" />
                </Col>
                {motor.passo.map((passo, index) => (

                    <Col className="col-md-1" key={index}>
                        <Label>Passo<span>*</span></Label>
                        <Input type="number" value={passo} id={`passo${index + 1}`} onChange={(e) => handleChangePasso(e, index)} min={0} bsSize="sm" />
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
                        <Label>Awg<span>*</span></Label>
                        <Input type="number" value={valor} onChange={(e) => handleChangeAWG(e, index)} min={0} bsSize="sm" />
                    </Col>
                ))}

                <Col className="col-md-2 mt-2 d-flex align-items-end">
                    <Button icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar AWG/Quantidade" size="sm" onClick={addInputs} />
                </Col>
            </Row>

            <Row>
                {motor.fio.quantidades.map((qtd, index) => (

                    <Col className="col-md-2" key={index}>
                        <Label>Quantidade<span>*</span></Label>
                        <Input type="number" value={qtd} id={`qtd${index + 1}`} onChange={(e) => handleChangeQTD(e, index)} min={0} bsSize="sm" />
                    </Col>

                ))}

                <Col className="col-md-2 mt-2 d-flex align-items-end">
                    <Button icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover AWG/Quantidade" size="sm" onClick={removeInputs} />
                </Col>
            </Row>
            <Row>
                {motor.fio.espiras.map((esp, index) => (

                    <Col className="col-md-2" key={index}>
                        <Label>Espiras<span>*</span></Label>
                        <Input type="number" value={esp} id={`esp${index + 1}`} onChange={(e) => handleChangeESP(e, index)} min={0} bsSize="sm" />
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
                        <Label>Voltagem<span>*</span></Label>
                        <Checkbox
                            label={`${checkbox.volts}v`} checked={checkbox.checked}
                            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                        />
                        {motor.voltagens.includes(checkbox.volts) && (
                            <><Label>Amperagem</Label>
                                <Input
                                    type="number"
                                    value={motor.amperagens[motor.voltagens.indexOf(checkbox.volts)]}
                                    min={0}
                                    onChange={(e) => {
                                        const updatedMotor = { ...newMotor };
                                        const value = e.target.value !== '' ? Number(e.target.value) : '';
                                        updatedMotor.amperagens[newMotor.voltagens.indexOf(checkbox.volts)] = value;
                                        setNewMotor(updatedMotor);
                                    }}
                                />

                            </>
                        )}
                    </div>
                ))}

            </Row>

            <Row>
                <Col className="col-md-3">
                    <Label>Tensão<span>*</span></Label>
                    <Input name="tensao" value={motor.tensao} disabled min={0} bsSize="sm" />
                </Col>
                <Col className="col-md-5">
                    <Label>Ligação<span>*</span></Label>
                    <Input name="ligacao" value={motor.ligacao} onChange={handleInputChange} type="text" min={0} bsSize="sm" />
                </Col>
                <Col className="col-md-4">
                    <Label>Empresa<span>*</span></Label>
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
                    <Label>Esquema</Label>
                    <Input type={"file"} name="file" id="fileInput" accept={".jpg, .png"} onChange={handleFileChange} bsSize="sm" />
                </Col>
            </Row>

            <Col className="d-flex justify-content-start mt-2">
                <small>
                    Itens marcados com <label><span>*</span></label> são obrigatórios
                </small>
            </Col>

            <Row>

                <Col className="d-flex justify-content-end mt-2">

                    <Button onClick={create} label="Cadastrar" icon="pi pi-check" size="sm" loading={loading} />
                    <Toast ref={toast} />
                </Col>
            </Row>

        </Card>
    );
}

export default MotorForm;
