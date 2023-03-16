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
            awgs: [""],
            quantidades: [""],
            espiras: [""],
            peso: 0,
        },
        voltagens: [],
        amperagens: [],
        usuario: {},
    });
    const [checkboxVolts, setCheckboxVolts] = useState([127, 220, 380, 440, 760])
    const [inputsAmps, setInputsAmps] = useState([])
    const [indexAWG, setIndexAWG] = useState([1])
    const [indexESP, setIndexESP] = useState([1])
    const { showMessageSuccess, showMessageAlert, showMessageError, toast } = useToast();
    const { authUser } = useContext(AuthContext);
    const service = new MotorService();

    const handleInputChange = (event) => {
        setMotor({ ...motor, [event.target.name]: event.target.value })
    }

    const handleInputChangePeso = (event) => {
        const { name, value } = event.target;
        setMotor({
            ...motor,
            fio: {
                ...motor.fio,
                [name]: value,
            }
        });
    }

    const addInputsESP = (e) => {
        if (indexESP <= 5) {
            e.preventDefault();

            motor.fio.espiras.push("")
            const espiras = [...motor.fio.espiras, ""]
            setMotor({ espiras: espiras, indexESP: indexESP + 1 });

        }
    }

    const addInputs = (e) => {
        if (indexAWG <= 5) {
            e.preventDefault();

            motor.fio.awgs.push("")
            motor.fio.quantidades.push("")
            setMotor({ awgs: [...motor.fio.awgs, ""], quantidades: [...motor.fio.quantidades, ""], indexAWG: indexAWG + 1 });

        }

    };

    const removeInputsESP = () => {
        motor.fio.espiras.pop()
        const espiras = [...motor.fio.espiras, ""]
        setMotor({ espiras: espiras, indexESP: indexESP - 1 })
    }

    const removeInputs = () => {
        motor.fio.awgs.pop()
        motor.fio.quantidades.pop()
        const awgs = [...motor.fio.awgs, ""]
        const quantidades = [...motor.fio.quantidades, ""]
        setMotor({ awgs: awgs, quantidades: quantidades, indexAWG: indexAWG - 1 })
    };

    //pega o valor do input
    const handleChangeAWG = (e, index) => {
        //numero max estipulado é 5

        if (index <= 5) {
            e.preventDefault();

            motor.fio.awgs[index] = e.target.value;
            setMotor([...motor.fio.awgs])
        }
    }

    //pega o valor do input
    const handleChangeQTD = (e, index) => {
        //numero max estipulado é 5
        if (index <= 5) {
            e.preventDefault();

            motor.fio.quantidades[index] = e.target.value;
            setMotor([...motor.fio.quantidades])
        }

    }

    const handleChangeAMP = (e, index) => {
        motor.amperagens[index] = e.target.value;
        setMotor([...motor.amperagens]);
    }

    const handleChangeESP = (e, index) => {
        motor.fio.espiras[index] = e.target.value;
        setMotor([...motor.fio.espiras]);
    }

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        let amperagens = motor.amperagens;
        let updatedList;

        if (checked && !motor.voltagens.includes(value)) {
            updatedList = [...motor.voltagens, value];
        } else if (!checked) {
            const index = motor.voltagens.findIndex(val => val === value);
            updatedList = [...motor.voltagens.slice(0, index), ...motor.voltagens.slice(index + 1)];
        } else {
            updatedList = motor.voltagens;
        }

        setMotor({ voltagens: updatedList }, () => {
            validateCheckbox(updatedList.map(str => parseInt(str, 10)));
        });


        if (checked) {
            const index = inputsAmps.length + 1;
            inputsAmps.push(
                <><Label>Amperagem</Label>
                    <Input className="form-control" type="number" onChange={(e) => handleChangeAMP(e, index)} bsSize="sm" /></>
            );
        } else {
            const index = checkboxVolts.indexOf(value);
            if (index > -1) {
                checkboxVolts.splice(index, 1);
                inputsAmps.splice(index, 1);
                //index = index - 1;

            }
            inputsAmps.pop()
        }
        setMotor({ amperagens })
        setCheckboxVolts({ checkboxVolts })
        setInputsAmps({ inputsAmps })
    }

    const validateCheckbox = (updatedList) => {

        if (updatedList.includes(220) && updatedList.includes(380) && updatedList.includes(440) && updatedList.includes(760)) {
            updatedList.includes(127) ? setMotor({ tensao: "" }) : setMotor({ tensao: "TRIFASICO" })

        } else if (updatedList.includes(127) && updatedList.includes(220)) {
            updatedList.includes(380) || updatedList.includes(440) || updatedList.includes(760) ? setMotor({ tensao: "" }) : setMotor({ tensao: "MONOFASICO" })

        } else {
            setMotor({ tensao: "" })
        }
    }

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
                {checkboxVolts.map((item, index) => (
                    <Col key={item}>
                        <Label>Voltagem<span>*</span></Label>
                        <Checkbox label={`${item}v`} name={item} value={item} onChange={(e) => handleCheckbox(e)} />
                        {inputsAmps[index]}
                    </Col>
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
                        <option value="ARCELOR">Arcelor</option>
                        <option value="RIVELLI">Rivelli</option>
                        <option value="DOWCORNING">Dow Corning</option>
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
