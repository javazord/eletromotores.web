import React, { useState } from "react";
import { Row, Col, Input, Label } from "reactstrap";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { useEffect } from "react";
import { MotorService } from '../../app/service/motor/motorService';
import { validate } from "./motorAttributes";
import useToast from "../../components/toast";
import { Toast } from "primereact/toast";
import Checkbox from "../../components/grid/checkbox";


export default function EditMotorDialog(props) {

    const [motor, setMotor] = useState({ ...props.motor });
    const [initialData, setInitialData] = useState({ ...props.motor });
    const [checkboxVolts, setCheckboxVolts] = useState([
        { volts: 127, checked: false },
        { volts: 220, checked: false },
        { volts: 380, checked: false },
        { volts: 440, checked: false },
        { volts: 760, checked: false },
    ]);
    const [loading, setLoading] = useState(false);
    const [empresas, setEmpresas] = useState([]);
    const [indexPasso, setIndexPasso] = useState(props.motor.passo.length);
    const [indexAWG, setIndexAWG] = useState(props.motor.fio.awgs.length);
    const [indexESP, setIndexESP] = useState(props.motor.fio.espiras.length);
    const { showMessageSuccess, showMessageError, toast } = useToast();
    const service = new MotorService();
    const { visible, onHide } = props;

    useEffect(() => {
        service.empresas().then(response => { setEmpresas(response.data) })
        console.log(motor)
        isChecked()
    }, [motor])

    const handleInputChangePeso = (event) => {
        setMotor({ ...motor, fio: { ...motor.fio, peso: event.target.value } });
    }

    const addInputsESP = () => {
        if (indexESP < 5) {
            setMotor(prevMotor => {
                const newEspiras = [...prevMotor.fio.espiras, 0];
                return {
                    ...prevMotor,
                    fio: {
                        ...prevMotor.fio,
                        espiras: newEspiras
                    }
                };
            });
            setIndexESP(prevIndex => prevIndex + 1)
        }
    }

    const removeInputsESP = () => {
        const newESP = [...motor.fio.espiras]
        newESP.pop()
        if (indexESP > 1) {
            setMotor(prevMotor => ({
                ...prevMotor,
                fio: {
                    ...prevMotor.fio,
                    espiras: newESP,
                },
            }));
            setIndexESP(prevIndex => prevIndex - 1)
        }

    }

    const addInputs = () => {
        if (indexAWG < 5) {
            setMotor(prevMotor => {
                const newAWG = [...prevMotor.fio.awgs, 0];
                const newQTD = [...prevMotor.fio.quantidades, 0];
                return {
                    ...prevMotor,
                    fio: {
                        ...prevMotor.fio,
                        awgs: newAWG,
                        quantidades: newQTD
                    }
                };
                console.log(prevMotor)
            });
            setIndexAWG(prevIndex => prevIndex + 1)

        }
    };

    const removeInputs = () => {
        const newAWG = [...motor.fio.awgs]
        const newQTD = [...motor.fio.quantidades]
        newAWG.pop();
        newQTD.pop();
        if (indexAWG > 1) {
            setMotor(prevMotor => {
                return {
                    ...prevMotor,
                    fio: {
                        ...prevMotor.fio,
                        awgs: newAWG,
                        quantidades: newQTD
                    }
                };
            });
            setIndexAWG(prevIndex => prevIndex - 1)
        }

    };

    const addInputsPasso = () => {
        if (indexPasso < 5) {
            setMotor(prevMotor => {
                const newStep = [...prevMotor.passo, 0];
                return {
                    ...prevMotor,
                    fio: {
                        ...prevMotor.fio
                    },
                    passo: newStep
                };
            });
            setIndexPasso(prevIndex => prevIndex + 1)
        }
    }

    const removeInputsPasso = () => {
        const newStep = [...motor.passo];
        newStep.pop();
        if (indexPasso > 2) {
            setMotor(prevMotor => ({
                ...prevMotor,
                fio: {
                    ...prevMotor.fio
                },
                passo: newStep
            }));
            setIndexPasso(prevIndex => prevIndex - 1)
            console.log(motor)
        }

    }

    //pega o valor do input
    const handleChangeAWG = (e, index) => {
        const newAwgs = [...motor.fio.awgs];
        if (index <= 4) {
            newAwgs[index] = e.target.value;
            setMotor({
                ...motor,
                fio: {
                    ...motor.fio,
                    awgs: newAwgs,
                },
            });
        };
    }

    //pega o valor do input
    const handleChangeQTD = (e, index) => {
        const newQtds = [...motor.fio.quantidades];
        if (index <= 4) {
            newQtds[index] = e.target.value;
            setMotor({
                ...motor,
                fio: {
                    ...motor.fio,
                    quantidades: newQtds,
                },
            });
        };
    }

    const handleChangeESP = (e, index) => {
        const newEsp = [...motor.fio.espiras];
        newEsp[index] = e.target.value;
        setMotor({
            ...motor,
            fio: {
                ...motor.fio,
                espiras: newEsp
            },
        });
    }

    const handleChangePasso = (e, index) => {
        const newStep = [...motor.passo];
        newStep[index] = e.target.value;
        setMotor({
            ...motor,
            fio: {
                ...motor.fio
            },
            passo: newStep
        });
    }

    const isChecked = () => {
        const updatedCheckboxVolts = checkboxVolts.map((checkboxVolt) => {
            const isChecked = initialData.voltagens.includes(checkboxVolt.volts);
            return { ...checkboxVolt, checked: isChecked };
        });
        setCheckboxVolts(updatedCheckboxVolts);
    }

    const validateCheckbox = () => {
        const updatedList = [...motor.voltagens]
        
        if (
            updatedList.includes(220) && updatedList.includes(380) && updatedList.includes(440) && updatedList.includes(760)
        ) {
            updatedList.includes(127)
                ? setMotor({ ...motor, tensao: "" })
                : setMotor({ ...motor, tensao: "TRIFASICO" });
        } else if (updatedList.includes(127) && updatedList.includes(220)) {
            updatedList.includes(380) ||
                updatedList.includes(440) ||
                updatedList.includes(760)
                ? setMotor({ ...motor, tensao: "" })
                : setMotor({ ...motor, tensao: "MONOFASICO" });
        } else {
            setMotor({ ...motor, tensao: "" });
        }

    };

    const handleCheckboxChange = (index, checked) => {
        const newCheckboxVolts = [...checkboxVolts];
        newCheckboxVolts[index].checked = checked;
        setCheckboxVolts(newCheckboxVolts);
        if (checked) {

            motor.voltagens.push(checkboxVolts[index].volts);
            motor.amperagens.splice(index, 0, 0);
        } else {
            const indexToRemove = motor.voltagens.indexOf(checkboxVolts[index].volts);
            motor.voltagens.splice(indexToRemove, 1);
            motor.amperagens.splice(indexToRemove, 1);
        }

        // ordenar ambos os arrays com base na ordem dos valores em `voltagens`
        const sortedArrays = motor.voltagens.map((volts, i) => ({
            volts,
            amperagem: motor.amperagens[i]
        })).sort((a, b) => b.amperagem - a.amperagem);

        motor.voltagens = sortedArrays.map(item => item.volts);
        motor.amperagens = sortedArrays.map(item => item.amperagem);

        validateCheckbox();
        setMotor(motor);

    };

    const load = () => {
        setTimeout(() => {
            setLoading(false);
            showMessageSuccess('Motor atualizado com sucesso!');
        }, 2000);
    }

    const update = () => {

        motor.usuario = motor.usuario.id
        try {
            validate(motor);
        } catch (error) {
            const msgs = error.mensagens;
            msgs.forEach(msg => toast.showMessageAlert(msg));
            return false;
        }
        service.update(motor)
            .then(response => {
                load();
            }).catch(erro => {
                console.log(erro)
                showMessageError(erro.response.data)
            })
    }

    const handleInputChange = (event) => {
        setMotor({ ...motor, [event.target.name]: event.target.value })
    }

    const handleCancel = () => {
        // redefinir dados para os iniciais
        setCheckboxVolts(
            checkboxVolts.map((checkbox) => ({
                ...checkbox,
                checked: initialData.voltagens.includes(checkbox.volts),
            }))
        );
        setMotor(initialData);
        onHide();
    };

    const footer = (
        <><Button label="Atualizar" className="p-button-success" icon="pi pi-check" onClick={update} size="sm" loading={loading} />
            <Button label="Fechar" className="p-button-secondary" icon="pi pi-times" onClick={handleCancel} size="sm" /></>
    )

    return (

        <Dialog
            header={`Atualizar Motor `}
            visible={visible}
            modal={true}
            style={{ width: '65vw' }}
            onHide={onHide} // Passa a propriedade onHide para o componente Dialog
            footer={footer}
        >
            <Row>
                <Col >
                    <Label>Marca<span>*</span> </Label>
                    <Input name="marca" value={motor.marca || ''} onChange={handleInputChange} type="text" bsSize="sm" />
                </Col>
                <Col>
                    <Label>Modelo</Label>
                    <Input name="modelo" value={motor.modelo || ''} onChange={handleInputChange} type="text" bsSize="sm" />
                </Col>
                <Col>
                    <Label>Ranhuras<span>*</span></Label>
                    <Input name="ranhuras" value={motor.ranhuras || ''} onChange={handleInputChange} type="number" min={0} bsSize="sm" />
                </Col>
                <Col>
                    <Label>Rotação</Label>
                    <Input name="rotacao" value={motor.rotacao || ''} onChange={handleInputChange} type="number" min={0} bsSize="sm" />
                </Col>
                <Col>
                    <Label>Peso<span>*</span></Label>
                    <Input name="peso" value={motor.fio.peso || ''} onChange={handleInputChangePeso} type="number" min={0} bsSize="sm" />
                </Col>
                <Col>
                    <Label>Potência</Label>
                    <Input name="potencia" value={motor.potencia || ''} onChange={handleInputChange} type="number" min={0} bsSize="sm" />
                </Col>
            </Row>

            <Row>


                <Col className="col-md-2">
                    <Label>Comprimento<span>*</span></Label>
                    <Input name="comprimento" value={motor.comprimento || ''} onChange={handleInputChange} type="number" min={0} bsSize="sm" />
                </Col>
                <Col className="col-md-2">
                    <Label>M. Externa<span>*</span></Label>
                    <Input name="medidaExterna" value={motor.medidaExterna || ''} onChange={handleInputChange} type="number" min={0} bsSize="sm" />
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
                                    bsSize="sm"
                                    onChange={(e) => {
                                        const newMotor = { ...motor };
                                        newMotor.amperagens[motor.voltagens.indexOf(checkbox.volts)] = Number(e.target.value);
                                        setMotor(newMotor);
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
                    <Input name="tensao" value={motor.tensao || ''} disabled type="text" bsSize="sm" />
                </Col>
                <Col className="col-md-5">
                    <Label>Ligação<span>*</span></Label>
                    <Input name="ligacao" value={motor.ligacao || ''} onChange={handleInputChange} type="text" min={0} bsSize="sm" />
                </Col>
                <Col className="col-md-4">
                    <Label>Empresa<span>*</span></Label>
                    <select name="empresa" value={motor.empresa || ''} onChange={handleInputChange} className="form-select form-select-sm">
                        <option value="">Selecione uma empresa</option>
                        {empresas.map((empresa) => (
                            <option key={empresa.valor} value={empresa.valor}>{empresa.descricao}</option>
                        ))}
                    </select>
                </Col>
            </Row>
            <Col className="d-flex justify-content-start mt-2">
                <small>
                    Itens marcados com <label><span>*</span></label> são obrigatórios
                </small>
            </Col>

            <Row>
                <Toast ref={toast} />

            </Row>

        </Dialog>
    );
}