import React, { useState, useMemo, useCallback } from "react";
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button';
import { useEffect } from "react";
import { MotorService } from '../../app/service/motor/motorService';
import { validate } from "./motorValidation";
import useToast from "../../components/toast";
import { Image } from 'primereact/image';
import _ from 'lodash'; // Importe o Lodash
import MotorEditForm from "./motorEditForm";
import { Container } from "react-bootstrap";


const EditMotorDialog = (props) => {

    const [motor, setMotor] = useState(_.cloneDeep(props.motor)); // Use _.cloneDeep
    const [newMotor, setNewMotor] = useState();
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
    const [indexPassoAuxiliar, setIndexPassoAuxiliar] = useState(0);
    const [indexPassoTrabalho, setIndexPassoTrabalho] = useState(0);
    const [indexPassoUnico, setIndexPassoUnico] = useState(0);
    const [indexAWGTrab, setIndexAWGTrab] = useState(0);
    const [indexAWGAux, setIndexAWGAux] = useState(0);
    const [indexAWGUnico, setIndexAWGUnico] = useState(0);
    const [indexESPTrab, setIndexESPTrab] = useState(0);
    const [indexESPAux, setIndexESPAux] = useState(0);
    const [indexESPUnico, setIndexESPUnico] = useState(0);
    const [indexTrabalho, setIndexTrabalho] = useState(0);
    const [indexAuxiliar, setIndexAuxiliar] = useState(0);
    const [indexUnico, setIndexUnico] = useState(0);
    const [reset, setReset] = useState(false);
    const { showMessageSuccess, showMessageError, showMessageAlert, toast } = useToast();
    const motorService = useMemo(() => new MotorService(), []);
    const { visible, onHide } = props;
    const [imagem,] = useState();
    const [showSchema, setShowSchema] = useState(false);

    const validateCheckbox = useCallback(() => {
        const updatedList = [...motor.voltagens];
        const hasAllTrifasicVoltages =
            updatedList.length === 4 &&
            updatedList.includes(220) &&
            updatedList.includes(380) &&
            updatedList.includes(440) &&
            updatedList.includes(760);

        const hasMonofasicVoltage = updatedList.length === 2 && updatedList.includes(127) && updatedList.includes(220);

        setMotor((prevMotor) => ({
            ...prevMotor,
            tensao: {
                ...prevMotor.tensao,
                tipoTensao: hasAllTrifasicVoltages ? 'TRIFASICO' : hasMonofasicVoltage ? 'MONOFASICO' : ''
            }
        }));
        
    }, [motor.voltagens, motor.tensao.bobinas, reset]);

    useEffect(() => {
        // Verificar se motorService e validateCheckbox estão definidos
        if (motorService && validateCheckbox) {
            // Chamar motorService.empresas e depois chamar validateCheckbox
            motorService.empresas().then(response => {
                setEmpresas([...response.data]);
                validateCheckbox();
            });
        }
    }, [motor.voltagens, motorService, validateCheckbox]);

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

            // Incrementar o estado de indexESP de acordo com o tipo de bobina
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
            }
            if (tipoBobina === 'TRABALHO') {
                setIndexPassoTrabalho(indexPassoTrabalho + 1)
            }
            if (tipoBobina === 'UNICO') {
                setIndexPassoUnico(indexPassoUnico + 1)
            }
        }

    };

    const removeInputs = (tipoBobina, propriedades) => {
        // Verifica se o tipo de bobina é válido
        if (!['AUXILIAR', 'TRABALHO', 'UNICO'].includes(tipoBobina)) return;

        // Cria uma cópia do estado atual do motor
        const updatedMotor = { ...motor };

        // Encontra o índice da bobina com base no tipo
        const bobinaIndex = updatedMotor.tensao.bobinas.findIndex((bobina) => bobina.tipoBobina === tipoBobina);

        // Verifica se a bobina foi encontrada
        if (bobinaIndex === -1) return;

        // Remove o último elemento dos arrays correspondentes dentro da bobina
        const updatedBobina = {
            ...updatedMotor.tensao.bobinas[bobinaIndex],
            fio: {
                ...updatedMotor.tensao.bobinas[bobinaIndex].fio,
            },
        };

        if (typeof propriedades === 'string') {
            // Se for uma única string, transforma em array com um único elemento
            propriedades = [propriedades];
        }

        propriedades.forEach((propriedade) => {
            if (updatedBobina.fio[propriedade] && updatedBobina.fio[propriedade].length > 1) {
                updatedBobina.fio[propriedade] = updatedBobina.fio[propriedade].slice(0, -1);
            }
        });

        // Remove o último elemento do array "passo" se existir
        if (propriedades.includes('passo') && updatedBobina.passo.length > 1) {
            updatedBobina.passo = updatedBobina.passo.slice(0, -1);
        }

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

        // Atualiza o índice correspondente
        switch (tipoBobina) {
            case 'AUXILIAR':
                setIndexAuxiliar((prevIndex) => prevIndex - 1);
                break;
            case 'TRABALHO':
                setIndexTrabalho((prevIndex) => prevIndex - 1);
                break;
            case 'UNICO':
                setIndexUnico((prevIndex) => prevIndex - 1);
                break;
            default:
                break;
        }
    };

    // --- leitura de valores ---
    const handleChange = (e, index, tipoBobina, propriedade) => {
        setMotor(prevMotor => {
            const newBobinas = prevMotor.tensao.bobinas.map(bobina => {
                if (bobina.tipoBobina === tipoBobina) {
                    const newValue = e.target.value;
                    if (propriedade === 'passo') {
                        const newPasso = [...bobina.passo];
                        newPasso[index] = newValue;
                        return { ...bobina, passo: newPasso };
                    } else if (propriedade === 'awg' || propriedade === 'quantidade' || propriedade === 'espiras') {
                        const newFio = { ...bobina.fio };
                        if (propriedade === 'awg') newFio.awgs[index] = newValue;
                        else if (propriedade === 'quantidade') newFio.quantidades[index] = newValue;
                        else if (propriedade === 'espiras') newFio.espiras[index] = newValue;
                        return { ...bobina, fio: newFio };
                    }
                }
                return bobina;
            });

            return {
                ...prevMotor,
                tensao: {
                    ...prevMotor.tensao,
                    bobinas: newBobinas
                }
            };
        });
    };

    const handleChangePasso = (e, index, tipoBobina) => {
        handleChange(e, index, tipoBobina, 'passo');
    };

    const handleChangeAWG = (e, index, tipoBobina) => {
        handleChange(e, index, tipoBobina, 'awg');
    };

    const handleChangeQuantidade = (e, index, tipoBobina) => {
        handleChange(e, index, tipoBobina, 'quantidade');
    };

    const handleChangeEspiras = (e, index, tipoBobina) => {
        handleChange(e, index, tipoBobina, 'espiras');
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

    const load = () => {
        setTimeout(() => {
            setLoading(false);
            onHide();
        }, 1500);
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
        <>
            <Container>
                <MotorEditForm
                    visible={visible}
                    onHide={onHide}
                    motor={motor}
                    checkboxVolts={checkboxVolts}
                    addInputs={addInputs}
                    addInputsESP={addInputsESP}
                    addInputsPasso={addInputsPasso}
                    removeInputs={removeInputs}
                    handleInputChange={handleInputChange}
                    handleCheckboxChange={handleCheckboxChange}
                    handleChangeAWG={handleChangeAWG}
                    handleChangeQuantidade={handleChangeQuantidade}
                    handleChangeEspiras={handleChangeEspiras}
                    handleChangePasso={handleChangePasso}
                    handleFileChange={handleFileChange}
                    empresas={empresas}
                    footer={footer}
                    toast={toast}
                />
            </Container>


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