import React, { useState, useMemo, useCallback } from "react";
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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


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
    const [newMotor, setNewMotor] = useState(motor);
    const [indexPassoAuxiliar, setIndexPassoAuxiliar] = useState(0);
    const [indexPassoTrabalho, setIndexPassoTrabalho] = useState(0);
    const [indexPassoUnico, setIndexPassoUnico] = useState(0);
    const [newIndexPasso, setNewIndexPasso] = useState(0);
    const [indexAWGTrab, setIndexAWGTrab] = useState(0);
    const [indexAWGAux, setIndexAWGAux] = useState(0);
    const [indexAWGUnico, setIndexAWGUnico] = useState(0);
    const [indexESPTrab, setIndexESPTrab] = useState(0);
    const [indexESPAux, setIndexESPAux] = useState(0);
    const [indexESPUnico, setIndexESPUnico] = useState(0);
    const [reset, setReset] = useState(false);
    const { showMessageSuccess, showMessageError, showMessageAlert, toast } = useToast();
    const motorService = useMemo(() => new MotorService(), []);
    const { visible, onHide } = props;
    const [imagem,] = useState();
    const [showSchema, setShowSchema] = useState(false);
    const [key, setKey] = useState('trabalho');

    const validateCheckbox = useCallback(() => {
        const updatedList = [...motor.voltagens];
        const hasAllTrifasicVoltages =
            updatedList.length === 4 &&
            updatedList.includes(220) &&
            updatedList.includes(380) &&
            updatedList.includes(440) &&
            updatedList.includes(760);

        const hasMonofasicVoltage = updatedList.length === 2 && updatedList.includes(127) && updatedList.includes(220);

        let newBobinas = [];

        if (reset) {
            newBobinas = [];
        } else {
            newBobinas = motor.tensao.bobinas;
            setReset(true);
        }

        if (hasAllTrifasicVoltages && newBobinas.length === 0) {
            newBobinas = [{
                tipoBobina: 'UNICO',
                fio: { awgs: [0], quantidades: [0], espiras: [0] },
                passo: [0]
            }];
        } else if (hasMonofasicVoltage && newBobinas.length === 0) {
            newBobinas = [{
                tipoBobina: 'AUXILIAR',
                fio: { awgs: [0], quantidades: [0], espiras: [0] },
                passo: [0]
            },
            {
                tipoBobina: 'TRABALHO',
                fio: { awgs: [0], quantidades: [0], espiras: [0] },
                passo: [0]
            }
            ];
        }

        setMotor((prevMotor) => ({
            ...prevMotor,
            tensao: {
                ...prevMotor.tensao,
                tipoTensao: hasAllTrifasicVoltages ? 'TRIFASICO' : hasMonofasicVoltage ? 'MONOFASICO' : '',
                bobinas: newBobinas // Defina o novo estado das bobinas dentro de tensao
            }
        }));
    }, [motor.voltagens]);

    useEffect(() => {
        motorService.empresas().then(response => { setEmpresas(response.data) })
        validateCheckbox();
    }, [motor.voltagens, motorService, validateCheckbox])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMotor({ ...motor, [name]: value });
    };

    const addInputsESP = (tipoBobina) => {
        const newMotor = { ...motor };

        // Encontrar o índice correto da bobina com base no tipo
        const bobinaIndex = newMotor.tensao.bobinas.findIndex(
            (bobina) => bobina.tipoBobina === tipoBobina
        );

        const indexAWG = newMotor.tensao.bobinas.find(
            (bobina) => bobina.tipoBobina === tipoBobina
        )?.fio.espiras.length || 0;

        if (indexAWG < 5) {
            const updatedBobina = {
                ...newMotor.tensao.bobinas[bobinaIndex],
                fio: {
                    ...newMotor.tensao.bobinas[bobinaIndex].fio,
                    espiras: [...newMotor.tensao.bobinas[bobinaIndex].fio.espiras, 0],
                },
            };

            const updatedBobinas = [...newMotor.tensao.bobinas];
            updatedBobinas[bobinaIndex] = updatedBobina;

            setMotor((prevMotor) => ({
                ...prevMotor,
                tensao: {
                    ...prevMotor.tensao,
                    bobinas: updatedBobinas,
                },
            }));

            // Incrementar o estado de indexAWG de acordo com o tipo de bobina
            switch (tipoBobina) {
                case 'AUXILIAR':
                    setIndexESPAux(indexESPAux + 1);
                    break;
                case 'TRABALHO':
                    setIndexESPTrab(indexESPTrab + 1);
                    break;
                case 'UNICO':
                    setIndexESPUnico(indexESPUnico + 1);
                    break;
                default:
                    break;
            }
        }
    }

    const removeInputsESP = (tipoBobina) => {
        // Verifica se o tipo de bobina é válido
        if (tipoBobina !== 'AUXILIAR' && tipoBobina !== 'TRABALHO' && tipoBobina !== 'UNICO') {
            return;
        }

        // Cria uma cópia do estado atual do motor
        const updatedMotor = { ...motor };

        // Encontra o índice da bobina com base no tipo
        const bobinaIndex = updatedMotor.tensao.bobinas.findIndex((bobina) => bobina.tipoBobina === tipoBobina);

        // Verifica se a bobina foi encontrada
        if (bobinaIndex === -1) {
            return;
        }

        // Remova o último elemento do array de passo da bobina correspondente
        const updatedBobina = {
            ...updatedMotor.tensao.bobinas[bobinaIndex],
            fio: {
                ...updatedMotor.tensao.bobinas[bobinaIndex].fio,
                espiras: updatedMotor.tensao.bobinas[bobinaIndex].fio.espiras.slice(0, -1)
            }
        };

        // Atualiza a matriz de bobinas
        const updatedBobinas = [...updatedMotor.tensao.bobinas];
        updatedBobinas[bobinaIndex] = updatedBobina;

        // Atualiza o estado do motor
        setMotor((prevMotor) => ({
            ...prevMotor,
            tensao: {
                ...prevMotor.tensao,
                bobinas: updatedBobinas,
            },
        }));

        // Atualiza o índice do passo correspondente
        switch (tipoBobina) {
            case 'AUXILIAR':
                setIndexESPAux(indexESPAux - 1);
                break;
            case 'TRABALHO':
                setIndexESPTrab(indexESPTrab - 1);
                break;
            case 'UNICO':
                setIndexESPUnico(indexESPUnico - 1);
                break;
            default:
                break;
        }
    }

    const addInputs = (tipoBobina) => {
        const newMotor = { ...motor };

        // Encontrar o índice correto da bobina com base no tipo
        const bobinaIndex = newMotor.tensao.bobinas.findIndex(
            (bobina) => bobina.tipoBobina === tipoBobina
        );

        const indexAWG = newMotor.tensao.bobinas.find(
            (bobina) => bobina.tipoBobina === tipoBobina
        )?.fio.awgs.length || 0;

        if (indexAWG < 5) {
            const updatedBobina = {
                ...newMotor.tensao.bobinas[bobinaIndex],
                fio: {
                    ...newMotor.tensao.bobinas[bobinaIndex].fio,
                    awgs: [...newMotor.tensao.bobinas[bobinaIndex].fio.awgs, 0],
                    quantidades: [...newMotor.tensao.bobinas[bobinaIndex].fio.quantidades, 0]
                },
            };

            const updatedBobinas = [...newMotor.tensao.bobinas];
            updatedBobinas[bobinaIndex] = updatedBobina;

            setMotor((prevMotor) => ({
                ...prevMotor,
                tensao: {
                    ...prevMotor.tensao,
                    bobinas: updatedBobinas,
                },
            }));

            // Incrementar o estado de indexAWG de acordo com o tipo de bobina
            switch (tipoBobina) {
                case 'AUXILIAR':
                    setIndexAWGAux(indexAWGAux + 1);
                    break;
                case 'TRABALHO':
                    setIndexAWGTrab(indexAWGTrab + 1);
                    break;
                case 'UNICO':
                    setIndexAWGUnico(indexAWGUnico + 1);
                    break;
                default:
                    break;
            }
        }
    };

    const removeInputs = (tipoBobina) => {
        // Verifica se o tipo de bobina é válido
        if (tipoBobina !== 'AUXILIAR' && tipoBobina !== 'TRABALHO' && tipoBobina !== 'UNICO') {
            return;
        }

        // Cria uma cópia do estado atual do motor
        const updatedMotor = { ...motor };

        // Encontra o índice da bobina com base no tipo
        const bobinaIndex = updatedMotor.tensao.bobinas.findIndex((bobina) => bobina.tipoBobina === tipoBobina);

        // Verifica se a bobina foi encontrada
        if (bobinaIndex === -1) {
            return;
        }

        // Verifica se os arrays awgs e quantidades existem dentro da bobina
        if (!updatedMotor.tensao.bobinas[bobinaIndex].fio || !updatedMotor.tensao.bobinas[bobinaIndex].fio.awgs || !updatedMotor.tensao.bobinas[bobinaIndex].fio.quantidades) {
            return;
        }

        // Remova o último elemento dos arrays de awgs e quantidades da bobina correspondente
        const updatedBobina = {
            ...updatedMotor.tensao.bobinas[bobinaIndex],
            fio: {
                ...updatedMotor.tensao.bobinas[bobinaIndex].fio,
                awgs: updatedMotor.tensao.bobinas[bobinaIndex].fio.awgs.slice(0, -1),
                quantidades: updatedMotor.tensao.bobinas[bobinaIndex].fio.quantidades.slice(0, -1)
            }
        };

        // Atualiza a matriz de bobinas
        const updatedBobinas = [...updatedMotor.tensao.bobinas];
        updatedBobinas[bobinaIndex] = updatedBobina;

        // Atualiza o estado do motor
        setMotor((prevMotor) => ({
            ...prevMotor,
            tensao: {
                ...prevMotor.tensao,
                bobinas: updatedBobinas,
            },
        }));

        // Atualiza o índice do passo correspondente
        switch (tipoBobina) {
            case 'AUXILIAR':
                setIndexAWGAux(indexAWGAux - 1);
                break;
            case 'TRABALHO':
                setIndexAWGTrab(indexAWGTrab - 1);
                break;
            case 'UNICO':
                setIndexAWGUnico(indexAWGUnico - 1);
                break;
            default:
                break;
        }
    };

    const addInputsPasso = (tipoBobina) => {
        const newMotor = { ...motor };

        // Encontrar o índice correto da bobina com base no tipo
        const bobinaIndex = newMotor.tensao.bobinas.findIndex(
            (bobina) => bobina.tipoBobina === tipoBobina
        );
        const newIndexPasso = newMotor.tensao.bobinas.find(
            (bobina) => bobina.tipoBobina === tipoBobina
        )?.passo.length || 0;

        if (newIndexPasso < 5) {
            const updatedBobina = {
                ...newMotor.tensao.bobinas[bobinaIndex],
                passo: [...newMotor.tensao.bobinas[bobinaIndex].passo, 0],
            };

            const updatedBobinas = [...newMotor.tensao.bobinas];
            updatedBobinas[bobinaIndex] = updatedBobina;

            setMotor((prevMotor) => ({
                ...prevMotor,
                tensao: {
                    ...prevMotor.tensao,
                    bobinas: updatedBobinas,
                },
            }));

            if (tipoBobina === 'AUXILIAR') {
                setIndexPassoAuxiliar(indexPassoAuxiliar + 1)
                setNewIndexPasso(indexPassoAuxiliar)
            }
            if (tipoBobina === 'TRABALHO') {
                setIndexPassoTrabalho(indexPassoTrabalho + 1)
                setNewIndexPasso(indexPassoTrabalho)
            }
            if (tipoBobina === 'UNICO') {
                setIndexPassoUnico(indexPassoUnico + 1)
                setNewIndexPasso(indexPassoUnico)
            }
        }

    };

    const removeInputsPasso = (tipoBobina) => {
        // Verifica se o tipo de bobina é válido
        if (tipoBobina !== 'AUXILIAR' && tipoBobina !== 'TRABALHO' && tipoBobina !== 'UNICO') {
            return;
        }

        // Cria uma cópia do estado atual do motor
        const updatedMotor = { ...motor };

        // Encontra o índice da bobina com base no tipo
        const bobinaIndex = updatedMotor.tensao.bobinas.findIndex((bobina) => bobina.tipoBobina === tipoBobina);

        // Verifica se a bobina foi encontrada
        if (bobinaIndex === -1) {
            return;
        }

        // Remova o último elemento do array de passo da bobina correspondente
        const updatedBobina = {
            ...updatedMotor.tensao.bobinas[bobinaIndex],
            passo: updatedMotor.tensao.bobinas[bobinaIndex].passo.slice(0, -1),
        };

        // Atualiza a matriz de bobinas
        const updatedBobinas = [...updatedMotor.tensao.bobinas];
        updatedBobinas[bobinaIndex] = updatedBobina;

        // Atualiza o estado do motor
        setMotor((prevMotor) => ({
            ...prevMotor,
            tensao: {
                ...prevMotor.tensao,
                bobinas: updatedBobinas,
            },
        }));

        // Atualiza o índice do passo correspondente
        if (tipoBobina === 'AUXILIAR') {
            setIndexPassoAuxiliar(indexPassoAuxiliar - 1);
        } else if (tipoBobina === 'TRABALHO') {
            setIndexPassoTrabalho(indexPassoTrabalho - 1);
        } else if (tipoBobina === 'UNICO') {
            setIndexPassoUnico(indexPassoUnico - 1);
        }
    };

    const handleChangePasso = (e, index, tipoBobina) => {
        const newMotor = { ...motor };

        // Encontrar o índice correto da bobina com base no tipo
        const bobinaIndex = newMotor.tensao.bobinas.findIndex(
            (bobina) => bobina.tipoBobina === tipoBobina
        );

        // Atualizar Passo
        if (tipoBobina === 'TRABALHO') {
            newMotor.tensao.bobinas[bobinaIndex].passo[index] = e.target.value !== '' ? Number(e.target.value) : 0;
        }
        if (tipoBobina === 'AUXILIAR') {
            newMotor.tensao.bobinas[bobinaIndex].passo[index] = e.target.value !== '' ? Number(e.target.value) : 0;
        }
        if (tipoBobina === 'UNICO') {
            newMotor.tensao.bobinas[bobinaIndex].passo[index] = e.target.value !== '' ? Number(e.target.value) : 0;
        }

        // Atualizar o estado
        setMotor(newMotor);
    }

    //pega o valor do input
    const handleChangeAWG = (e, index, tipoBobina) => {
        const newMotor = { ...motor };

        // Encontrar o índice correto da bobina com base no tipo
        const bobinaIndex = newMotor.tensao.bobinas.findIndex(
            (bobina) => bobina.tipoBobina === tipoBobina
        );

        // Atualizar AWG
        if (tipoBobina === 'TRABALHO') {
            newMotor.tensao.bobinas[bobinaIndex].fio.awgs[index] = e.target.value !== '' ? Number(e.target.value) : 0;
        }
        if (tipoBobina === 'AUXILIAR') {
            newMotor.tensao.bobinas[bobinaIndex].fio.awgs[index] = e.target.value !== '' ? Number(e.target.value) : 0;
        }
        if (tipoBobina === 'UNICO') {
            newMotor.tensao.bobinas[bobinaIndex].fio.awgs[index] = e.target.value !== '' ? Number(e.target.value) : 0;
        }

        // Atualizar o estado
        setMotor(newMotor);
    };

    //pega o valor do input
    const handleChangeQuantidade = (e, index, tipoBobina) => {
        const newMotor = { ...motor };

        // Encontrar o índice correto da bobina com base no tipo
        const bobinaIndex = newMotor.tensao.bobinas.findIndex(
            (bobina) => bobina.tipoBobina === tipoBobina
        );

        // Atualizar a quantidade
        newMotor.tensao.bobinas[bobinaIndex].fio.quantidades[index] =
            e.target.value !== '' ? Number(e.target.value) : 0;

        // Atualizar o estado
        setMotor(newMotor);
    };

    const handleChangeEspiras = (e, index, tipoBobina) => {
        const newMotor = { ...motor };

        // Encontrar o índice correto da bobina com base no tipo
        const bobinaIndex = newMotor.tensao.bobinas.findIndex(
            (bobina) => bobina.tipoBobina === tipoBobina
        );

        // Atualizar a espiras
        newMotor.tensao.bobinas[bobinaIndex].fio.espiras[index] =
            e.target.value !== '' ? Number(e.target.value) : 0;

        // Atualizar o estado
        setMotor(newMotor);
    }

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
                load();
                showMessageSuccess('Motor atualizado com sucesso!');
            })
            .catch(error => {
                load();
                showMessageError(error.message);
            });

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
                                    <React.Fragment key={bobinaIndex}>
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
                                    <React.Fragment key={bobinaIndex}>
                                        {bobina.fio.quantidades.map((valorQTD, index) => (
                                            <Col className="col-md-2" key={index}>
                                                <Form.Label>Quantidade<span className="asteriscos">*</span></Form.Label>
                                                <Form.Control type="number" value={valorQTD} id={`qtdTrab${index + 1}`} onChange={(e) => handleChangeQuantidade(e, index, 'TRABALHO')} min={0} size="sm" />
                                            </Col>
                                        ))}
                                    </React.Fragment>

                                ))}

                                <Col className="col-md-2 mt-2 d-flex align-items-end">
                                    <Button icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover AWG/Quantidade" size="sm" onClick={() => removeInputs('TRABALHO')} />
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
                                    <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Espiras" onClick={() => removeInputsESP('TRABALHO')} size="small" />
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
                                    <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Passo" onClick={() => removeInputsPasso('TRABALHO')} size="sm" />
                                </Col>
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
                                {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'AUXILIAR').map((bobina, bobinaIndex) => (
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
                                    <Button icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover AWG/Quantidade" size="sm" onClick={() => removeInputs('AUXILIAR')} />
                                </Col>
                            </Row>
                            <Row>
                                {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'AUXILIAR').map((bobina, bobinaIndex) => (
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
                                    <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Espiras" onClick={() => removeInputsESP('AUXILIAR')} size="small" />
                                </Col>

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
                                    <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Passo" onClick={() => removeInputsPasso('AUXILIAR')} size="sm" />
                                </Col>
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
                            {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'UNICO').map((bobina, bobinaIndex) => (
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
                                <Button icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover AWG/Quantidade" size="sm" onClick={() => removeInputs('UNICO')} />
                            </Col>
                        </Row>
                        <Row>
                            {motor.tensao.bobinas.filter((bobina) => bobina.tipoBobina === 'UNICO').map((bobina, bobinaIndex) => (
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
                                <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Espiras" onClick={() => removeInputsESP('UNICO')} size="small" />
                            </Col>
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
                                <Button className="ms-1" icon="pi pi-minus" rounded raised severity="danger" tooltip="Remover Passo" onClick={() => removeInputsPasso('UNICO')} size="sm" />
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