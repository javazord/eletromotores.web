import React, { useState, useMemo } from "react";
import { Dialog } from 'primereact/dialog'
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { useEffect } from "react";
import { MotorService } from '../../app/service/motor/motorService';
import { validate } from "./motorValidation";
import useToast from "../../components/toast";
import { Toast } from "primereact/toast";
import Checkbox from "../../components/grid/checkbox";
import { Image } from 'primereact/image';
import _ from 'lodash'; // Importe o Lodash


const EditMotorDialog = (props) => {

    const [motor, setMotor] = useState(_.cloneDeep(props.motor)); // Use _.cloneDeep
    const [initialData,] = useState(_.cloneDeep(props.motor));
    const [checkboxVolts, setCheckboxVolts] = useState([
        { volts: 127, checked: initialData.voltagens.includes(127) ? true : false },
        { volts: 220, checked: initialData.voltagens.includes(220) ? true : false },
        { volts: 380, checked: initialData.voltagens.includes(380) ? true : false },
        { volts: 440, checked: initialData.voltagens.includes(440) ? true : false },
        { volts: 760, checked: initialData.voltagens.includes(760) ? true : false },
    ]);
    const [loading, setLoading] = useState(false);
    const [empresas, setEmpresas] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [indexPasso, setIndexPasso] = useState(props.motor.passo.length);
    const [indexAWG, setIndexAWG] = useState(props.motor.fio.awgs.length);
    const [indexESP, setIndexESP] = useState(props.motor.fio.espiras.length);
    const { showMessageSuccess, showMessageError, showMessageAlert, toast } = useToast();
    const motorService = useMemo(() => new MotorService(), []);
    const { visible, onHide } = props;
    const [imagem,] = useState();
    const [showSchema, setShowSchema] = useState(false);

    useEffect(() => {
        motorService.empresas().then(response => { setEmpresas(response.data) })
    }, [motor, motorService])

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
        // 1. Adicione o valor ao final da matriz
        const newStep = [...motor.passo];
        newStep[index] = e.target.value;

        // 2. Ordene a matriz em ordem crescente
        newStep.sort((a, b) => a - b);

        setMotor({
            ...motor,
            fio: {
                ...motor.fio
            },
            passo: newStep
        });
    }


    const handleCheckboxChange = (index, checked) => {


        const newCheckboxVolts = [...checkboxVolts];
        newCheckboxVolts[index].checked = checked;
        setCheckboxVolts(newCheckboxVolts);

        const updatedMotor = { ...motor }; // Crie uma cópia do estado motor
        if (checked) {
            updatedMotor.voltagens.push(checkboxVolts[index].volts);
            updatedMotor.amperagens.splice(index, 0, 0);
        } else {
            const indexToRemove = updatedMotor.voltagens.indexOf(checkboxVolts[index].volts);
            updatedMotor.voltagens.splice(indexToRemove, 1);
            updatedMotor.amperagens.splice(indexToRemove, 1);
        }

        // ordenar ambos os arrays com base na ordem dos valores em `voltagens`
        const sortedArrays = updatedMotor.voltagens.map((volts, i) => ({
            volts,
            amperagem: updatedMotor.amperagens[i]
        })).sort((a, b) => b.amperagem - a.amperagem);

        updatedMotor.voltagens = sortedArrays.map(item => item.volts);
        updatedMotor.amperagens = sortedArrays.map(item => item.amperagem);

        setMotor(updatedMotor); // Atualize o estado com a nova cópia atualizada do motor

        validateCheckbox();
    };

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

    const load = () => {
        setTimeout(() => {
            setLoading(false);
            onHide();
        }, 1500);
    }

    const onTemplateClear = () => {
        setSelectedFile(null)
    };

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

    const update = () => {

        motor.usuario = motor.usuario.id
        try {
            validate(motor);
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
            const emptyImage = new File([new Blob()], 'semimagem.png', { type: 'image/png' });
            formData.append('file', emptyImage);
        }

        // Converte o objeto 'motorInsert' para uma string JSON e o adiciona à solicitação
        formData.append('motorData', JSON.stringify(motor));
        motorService.update(formData)
            .then(response => {
                showMessageSuccess('Motor atualizado com sucesso!');
                load();
            })
            .catch(error => {
                load();
                showMessageError(error.message);
            });

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

        <><Modal
            show={visible}
            modal={true}
            onHide={onHide}
            centered
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>Editar Motor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Label>Marca<span>*</span> </Form.Label>
                        <Form.Control name="marca" value={motor.marca || ''} onChange={handleInputChange} type="text" size="sm" />
                    </Col>
                    <Col>
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control name="modelo" value={motor.modelo || ''} onChange={handleInputChange} type="text" size="sm" />
                    </Col>
                    <Col>
                        <Form.Label>Ranhuras<span>*</span></Form.Label>
                        <Form.Control name="ranhuras" value={motor.ranhuras || ''} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                    <Col>
                        <Form.Label>Rotação</Form.Label>
                        <Form.Control name="rotacao" value={motor.rotacao || ''} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                    <Col>
                        <Form.Label>Peso<span>*</span></Form.Label>
                        <Form.Control name="peso" value={motor.fio.peso ? motor.fio.peso.toFixed(3) : ''} onChange={handleInputChangePeso} type="number" min={0} size="sm" />
                    </Col>
                    <Col>
                        <Form.Label>Potência</Form.Label>
                        <Form.Control name="potencia" value={motor.potencia || ''} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                </Row>

                <Row>
                    <Col className="col-md-2">
                        <Form.Label>Comprimento<span>*</span></Form.Label>
                        <Form.Control name="comprimento" value={motor.comprimento || ''} onChange={handleInputChange} type="number" min={0} size="sm" />
                    </Col>
                    <Col className="col-md-2">
                        <Form.Label>M. Externa<span>*</span></Form.Label>
                        <Form.Control name="medidaExterna" value={motor.medidaExterna || ''} onChange={handleInputChange} type="number" min={0} size="sm" />
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
                                        type="number"
                                        value={motor.amperagens[motor.voltagens.indexOf(checkbox.volts)]}
                                        min={0}
                                        size="sm"
                                        onChange={(e) => {
                                            const newMotor = { ...motor };
                                            newMotor.amperagens[motor.voltagens.indexOf(checkbox.volts)] = Number(e.target.value);
                                            setMotor(newMotor);
                                        }} />
                                </>
                            )}
                        </div>
                    ))}

                </Row>

                <Row>
                    <Col className="col-md-3">
                        <Form.Label>Tensão<span>*</span></Form.Label>
                        <Form.Control name="tensao" value={motor.tensao} disabled type="text" size="sm" />
                    </Col>
                    <Col className="col-md-5">
                        <Form.Label>Ligação<span>*</span></Form.Label>
                        <Form.Control name="ligacao" value={motor.ligacao || ''} onChange={handleInputChange} type="text" min={0} size="sm" />
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

                    <Row>
                        <Col className="col-md-6 mt-2">
                            <Form.Label>Esquema</Form.Label>
                            <Form.Control type={"file"} accept={".jpg, .png"} onChange={handleFileChange} size="sm" />

                        </Col>
                        <Col className="mt-2 d-flex align-items-end">
                            <Button icon='pi pi-fw pi-times' className='custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' onClick={onTemplateClear} tooltip="Limpar imagem" />
                        </Col>

                    </Row>

                </Row>
                <Row>
                    <Col className="col-md-6 mt-2">
                        <small>
                            Itens marcados com <label><span>*</span></label> são obrigatórios
                        </small>
                    </Col>
                </Row>


                <Row>
                    <Toast ref={toast} />
                </Row>
            </Modal.Body>

            <Modal.Footer>{footer}</Modal.Footer>

        </Modal>

            <Dialog header="Esquema" visible={showSchema} style={{ width: '55vw' }} onHide={() => setShowSchema(false)}>
                {typeof motor.imagem.dados ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src={`data:${motor.imagem.tipo};base64,${motor.imagem.dados}`} loading="lazy" alt={motor.imagem.nome} preview width="250" />
                    </div>
                ) : (
                    <p>{imagem}</p>
                )}
            </Dialog>
        </>
    );
}
export default EditMotorDialog;