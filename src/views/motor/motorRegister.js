import React, { useContext, useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Col, Row } from 'reactstrap';
import { Button } from 'primereact/button';
import HandleInputResetValues from '../../components/events/handleInputResetValues';
import Checkbox from "../../components/grid/checkbox";
import { AuthContext } from "../../main/authProvider";
import { Input, Label } from "reactstrap";
import { validate } from "./motorAttributes";
import { MotorService } from "../../app/service/motor/motorService";
import useToast from "../../components/toast";
import { Toast } from "primereact/toast";

const MotorRegister = () => {

    const [motor, setMotor] = useState({
        rotacao: 0,
        modelo: '',
        ranhuras: 0,
        marca: '',
        ligacao: '',
        potencia: 0,
        comprimento: 0,
        medidaExterna: 0,
        empresa: '',
        tensao: '',
        fio: {
            awgs: [0],
            quantidades: [0],
            espiras: [0],
            peso: 0,
        },
        voltagens: [],
        amperagens: [],
        passo: [],
        usuario: {},
    });
    const [checkboxVolts, setCheckboxVolts] = useState([
        { volts: 127, checked: false },
        { volts: 220, checked: false },
        { volts: 380, checked: false },
        { volts: 440, checked: false },
        { volts: 760, checked: false },
    ]);
    const [inputsAmps, setInputsAmps] = useState([])
    const [indexAmp, setIndexAmp] = useState(1)
    const [indexAWG, setIndexAWG] = useState(1)
    const [indexESP, setIndexESP] = useState(1)
    const { showMessageSuccess, showMessageAlert, showMessageError, toast } = useToast();
    const { authUser } = useContext(AuthContext);
    const service = new MotorService();

    const handleInputChange = (event) => {
        setMotor({ ...motor, [event.target.name]: event.target.value })
    }

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
        const newESP = motor.fio.espiras.slice(1);
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
            });
            setIndexAWG(prevIndex => prevIndex + 1)
        }
    };

    const removeInputs = () => {
        const newAWG = motor.fio.awgs.slice(1)
        const newQTD = motor.fio.quantidades.slice(1)
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

    const validateCheckbox = () => {
        const updatedList = motor.voltagens.slice();

        if (
            updatedList.includes(220) &&
            updatedList.includes(380) &&
            updatedList.includes(440) &&
            updatedList.includes(760)
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

    const handleCheckboxChange = (index) => {
        const updatedCheckboxVolts = checkboxVolts.map((checkbox, i) => {
            if (i === index) {
                checkbox.checked = !checkbox.checked;
            }
            return checkbox;
        });
        setCheckboxVolts(updatedCheckboxVolts);

        const updatedVoltagens = [...motor.voltagens];
        const updatedAmperagens = motor.amperagens.filter(
            (amperagem) => amperagem.volts !== checkboxVolts[index].volts
        );

        if (checkboxVolts[index].checked) {
            setMotor((prevMotor) => ({
                ...prevMotor,
                amperagens: [...updatedAmperagens, 0],
                voltagens: [...updatedVoltagens, checkboxVolts[index].volts],
            }));
        } else {
            setMotor((prevMotor) => ({
                ...prevMotor,
                amperagens: updatedAmperagens,
                voltagens: updatedVoltagens.filter(
                    (voltagem) => voltagem !== checkboxVolts[index].volts
                ),
            }));
        }
    };

    useEffect(() => {
        validateCheckbox();
    }, [motor.voltagens]);

    const handleAmperagemChange = (index, value) => {
        const updatedAmperagens = motor.amperagens.map((amperagem, i) => {
            if (i === index) {
                amperagem = value;
            }
            return amperagem;
        });
        setMotor((prevMotor) => {
            return {
                ...prevMotor,
                amperagens: updatedAmperagens,
            };
        });
    };

    const resetState = () => {
        setMotor({
            rotacao: 0,
            modelo: '',
            ranhuras: 0,
            marca: '',
            ligacao: '',
            potencia: 0,
            comprimento: 0,
            medidaExterna: 0,
            empresa: '',
            tensao: '',
            fio: {
                awgs: [],
                quantidades: [],
                espiras: [],
                peso: 0,
            },
            voltagens: [],
            amperagens: [],
            usuario: {},
        })
    }

    const create = () => {

        const { marca, modelo, ranhuras, rotacao, ligacao, potencia, comprimento, medidaExterna, tensao, fio, voltagens, amperagens, empresa } = motor;

        const motorInsert = {
            marca,
            modelo,
            ranhuras: parseInt(ranhuras),
            rotacao: parseInt(rotacao),
            ligacao,
            potencia: parseInt(potencia),
            comprimento: parseInt(comprimento),
            medidaExterna: parseInt(medidaExterna),
            tensao,
            empresa,
            fio: {
                awgs: fio.awgs.map(str => { return parseInt(str, 10) }),
                quantidades: fio.quantidades.map(str => { return parseInt(str, 10) }),
                espiras: fio.espiras.map(str => { return parseInt(str, 10) }),
                peso: parseInt(fio.peso),
            },
            voltagens: voltagens.sort().map(str => { return parseInt(str, 10) }),
            amperagens: amperagens.map(str => { return parseFloat(str, 10) }),
            usuario: authUser.id
        }
        try {
            validate(motorInsert);
        } catch (error) {
            const msgs = error.mensagens;
            showMessageAlert(msgs);
            return false;
        }
        service.save(motorInsert)
            .then(response => {
                showMessageSuccess("Motor registrado com sucesso!")
                HandleInputResetValues()
                resetState()
            }).catch(erro => {
                showMessageError(erro.response.data)
            })
    }

    return (
        <Card title={"Cadastrar Motor"}>
            <Row>
                <Col>
                    <Label>Marca<span>*</span></Label>
                    <Input name="marca" value={motor.marca} onChange={handleInputChange} type="text" className="form-control" bsSize="sm" />
                </Col>
                <Col>
                    <Label>Modelo</Label>
                    <Input name="modelo" value={motor.modelo} onChange={handleInputChange} type="text" className="form-control" bsSize="sm" />
                </Col>
                <Col>
                    <Label>Ranhuras<span>*</span></Label>
                    <Input name="ranhuras" value={motor.ranhuras} onChange={handleInputChange} type="number" className="form-control" bsSize="sm" />
                </Col>
                <Col>
                    <Label>Rotação</Label>
                    <Input name="rotacao" value={motor.rotacao} onChange={handleInputChange} type="number" className="form-control" bsSize="sm" />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Label>Peso<span>*</span></Label>
                    <Input name="peso" value={motor.fio.peso} onChange={handleInputChangePeso} type="number" className="form-control" bsSize="sm" />
                </Col>
                <Col>
                    <Label>Potência</Label>
                    <Input name="potencia" value={motor.potencia} onChange={handleInputChange} type="number" className="form-control" bsSize="sm" />
                </Col>
                <Col>
                    <Label>Comprimento<span>*</span></Label>
                    <Input name="comprimento" value={motor.comprimento} onChange={handleInputChange} type="number" min="1" max="100" className="form-control" bsSize="sm" />
                </Col>
                <Col>
                    <Label>M. Externa<span>*</span></Label>
                    <Input name="medidaExterna" value={motor.medidaExterna} onChange={handleInputChange} type="number" className="form-control" bsSize="sm" />
                </Col>
            </Row>

            <Row>
                {motor.fio.awgs.map((valor, index) => (
                    <Col className="col-md-2" key={index}>
                        <Label>Awg<span>*</span></Label>
                        <Input className="form-control" type="number" value={valor} onChange={(e) => handleChangeAWG(e, index)} bsSize="sm" />
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
                        <Input className="form-control" type="number" value={qtd} id={`qtd${index + 1}`} onChange={(e) => handleChangeQTD(e, index)} bsSize="sm" />
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
                        <Input className="form-control" type="number" value={esp} id={`esp${index + 1}`} onChange={(e) => handleChangeESP(e, index)} bsSize="sm" />
                    </Col>

                ))}
                <Col className="col-2 mt-2 d-flex align-items-end">
                    <Button className="me-1" icon="pi pi-plus" rounded raised severity="info" tooltip="Adicionar Espiras" onClick={addInputsESP} size="sm" />
                    <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Espiras" onClick={removeInputsESP} size="sm" />
                </Col>

            </Row>
            <Row className="mt-2">
                {checkboxVolts.map((checkbox, index) => (
                    <div className="col-md-2" key={index}>
                        <Label>Voltagem<span>*</span></Label>
                        <Checkbox label={`${checkbox.volts}v`} checked={checkbox.checked} onChange={() => handleCheckboxChange(index)} />
                        {checkbox.checked && (
                            <><Label>Amperagem</Label>
                            <Input type="number" onChange={(e) => handleAmperagemChange(index, e.target.value)} bsSize="sm" /></>
                        )}
                    </div>

                ))}
            </Row>

            <Row>
                <Col className="col-md-3">
                    <Label>Tensão<span>*</span></Label>
                    <Input className="form-control" name="tensao" value={motor.tensao} disabled bsSize="sm" />
                </Col>
                <Col className="col-md-5">
                    <Label>Ligação<span>*</span></Label>
                    <Input name="ligacao" value={motor.ligacao} onChange={handleInputChange} type="text" className="form-control" bsSize="sm" />
                </Col>
                <Col className="col-md-4">
                    <Label>Empresa<span>*</span></Label>
                    <select name="empresa" value={motor.empresa} onChange={handleInputChange} className="form-select form-select-sm">
                        <option value="ARCELOR" selected>Arcelor</option>
                        <option value="RIVELLI">Rivelli</option>
                        <option value="Detecta">Detecta</option>
                        <option value="DOWCORNING">Dow Corning</option>
                        <option value="ELBA">Elba</option>
                        <option value="PARTICULAR">Particular</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end mt-2">
                    <Button onClick={create} label="Cadastrar" icon="pi pi-check" size="sm" />
                    <Toast ref={toast} />
                </Col>
            </Row>

        </Card>
    )

}
export default MotorRegister;
