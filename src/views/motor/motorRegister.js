import React, { useContext, useEffect, useState, useRef } from "react";
import { Card } from "primereact/card";
import { Col, Row } from 'reactstrap';
import { Button } from 'primereact/button';
import Checkbox from "../../components/grid/checkbox";
import { AuthContext } from "../../main/authProvider";
import { Input, Label } from "reactstrap";
import { validate } from "./motorAttributes";
import { MotorService } from "../../app/service/motor/motorService";
import { ImagemService } from "../../app/service/imagem/imagemService";
import useToast from "../../components/toast";
import { Toast } from "primereact/toast";
import { InputText } from 'primereact/inputtext';


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
        passo: [0],
        usuario: {},
        imagem: {
            dados: null,
            nome: null,
            tipo: null
        }
    });
    const [checkboxVolts, setCheckboxVolts] = useState([
        { volts: 127, checked: false },
        { volts: 220, checked: false },
        { volts: 380, checked: false },
        { volts: 440, checked: false },
        { volts: 760, checked: false },
    ]);
    const [loading, setLoading] = useState(false);
    const [empresas, setEmpresas] = useState([]);
    const [indexPasso, setIndexPasso] = useState(1);
    const [indexAWG, setIndexAWG] = useState(1)
    const [indexESP, setIndexESP] = useState(1)
    const { showMessageSuccess, showMessageAlert, showMessageError, toast } = useToast();
    const { authUser } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const motorService = new MotorService();
    const imgService = new ImagemService();

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
        const newStep = motor.passo.slice(1);
        if (indexPasso > 1) {
            setMotor(prevMotor => ({
                ...prevMotor,
                fio: {
                    ...prevMotor.fio
                },
                passo: newStep
            }));
            setIndexPasso(prevIndex => prevIndex - 1)
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

    const validateCheckbox = () => {
        const updatedList = [...motor.voltagens];
        const hasAllTrifasicVoltages =
            updatedList.length === 4 &&
            updatedList.includes(220) &&
            updatedList.includes(380) &&
            updatedList.includes(440) &&
            updatedList.includes(760);

        const hasMonofasicVoltage = updatedList.length === 2 && updatedList.includes(127) && updatedList.includes(220);

        if (hasAllTrifasicVoltages) {
            setMotor((prevMotor) => ({ ...prevMotor, tensao: updatedList.includes(127) ? '' : 'TRIFASICO' }));
        } else if (hasMonofasicVoltage) {
            const hasOtherVoltages = updatedList.some((voltage) => voltage === 380 || voltage === 440 || voltage === 760);
            setMotor((prevMotor) => ({ ...prevMotor, tensao: hasOtherVoltages ? '' : 'MONOFASICO' }));
        } else {
            setMotor((prevMotor) => ({ ...prevMotor, tensao: '' }));
        }
    };

    const handleCheckboxChange = (index, checked) => {
        const newCheckboxVolts = [...checkboxVolts];
        newCheckboxVolts[index].checked = checked;
        setCheckboxVolts(newCheckboxVolts);
        const newMotor = { ...motor };
        if (checked) {

            newMotor.voltagens.push(checkboxVolts[index].volts);
            newMotor.amperagens.splice(index, 0, 0);
        } else {
            const indexToRemove = newMotor.voltagens.indexOf(checkboxVolts[index].volts);
            newMotor.voltagens.splice(indexToRemove, 1);
            newMotor.amperagens.splice(indexToRemove, 1);
        }

        // ordenar ambos os arrays com base na ordem dos valores em `voltagens`
        const sortedArrays = newMotor.voltagens.map((volts, i) => ({
            volts,
            amperagem: newMotor.amperagens[i]
        })).sort((a, b) => b.amperagem - a.amperagem);

        newMotor.voltagens = sortedArrays.map(item => item.volts);
        newMotor.amperagens = sortedArrays.map(item => item.amperagem);

        setMotor(newMotor);
    };

    useEffect(() => {
        motorService.empresas().then(response => {
            setEmpresas([...response.data]);
        })

        validateCheckbox();
    }, [motor.voltagens]);

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
                awgs: [0],
                quantidades: [0],
                espiras: [0],
                peso: 0,
            },
            voltagens: [],
            amperagens: [],
            passo: [0],
            usuario: {},
        })
        setSelectedFile(null);
        setCheckboxVolts(checkboxVolts.map(item => ({ ...item, checked: false })));
    }

    const load = () => {
        setTimeout(() => {
            setLoading(false);

        }, 2000);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png"];
        if (file && allowedTypes.includes(file.type)) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            showMessageError("Tipo de arquivo inválido. Selecione uma imagem JPG ou PNG.");
        }
    }

    const parseAsIntIfString = (value) => {
        if (typeof value === 'string') {
            return parseInt(value, 10);
        }
        return value;
    }

    const parseAsFloatIfString = (value) => {
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        return value;
    }

    const create = () => {

        const { marca, modelo, ranhuras, rotacao, ligacao, potencia, comprimento, medidaExterna, tensao, fio, voltagens, amperagens, passo, empresa, imagem } = motor;

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
                awgs: fio.awgs.map(parseAsIntIfString),
                quantidades: fio.quantidades.map(parseAsIntIfString),
                espiras: fio.espiras.map(parseAsIntIfString),
                peso: parseFloat(fio.peso),
            },
            voltagens: voltagens.sort().map(parseAsIntIfString),
            amperagens: amperagens.map(parseAsFloatIfString),
            passo: passo.sort().map(parseAsIntIfString),
            usuario: authUser.id,
            imagem
        }

        try {
            validate(motorInsert);
        } catch (error) {
            const msgs = error.mensagens;
            showMessageAlert(msgs);
            return false;
        }

        setLoading(true);



        const formData = new FormData();
        if (selectedFile) {
            formData.append('file', selectedFile);
        } else {
            // Crie um arquivo de imagem vazio (por exemplo, uma imagem transparente de 1x1 pixel)
            const emptyImage = new File([null], null, { type: null });
            formData.append('file', emptyImage);
        }

        // Converte o objeto 'motorInsert' para uma string JSON e o adiciona à solicitação
        formData.append('motorData', JSON.stringify(motorInsert));

        motorService.save(formData)
            .then(response => {
                load();
                showMessageSuccess('Motor cadastrado com sucesso!');
                resetState();
            })
            .catch(error => {
                load();
                showMessageError(error.response.data);
            });


    }

    return (
        <Card title={"Cadastrar Motor"} style={{ maxWidth: "100%" }}>
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
                                        const newMotor = { ...motor };
                                        const value = e.target.value !== '' ? Number(e.target.value) : '';
                                        newMotor.amperagens[motor.voltagens.indexOf(checkbox.volts)] = value;
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
    )

}
export default MotorRegister;
