import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { AuthContext } from "../../main/authProvider";
import { validate } from "./motorValidation";
import { MotorService } from "../../app/service/motor/motorService";
import useToast from "../../components/toast";
import MotorRegisterForm from "./motorRegisterForm";

const initialState = {
    rotacao: 0,
    modelo: '',
    ranhuras: 0,
    marca: '',
    ligacao: '',
    potencia: 0,
    comprimento: 0,
    medidaInterna: 0,
    empresa: '',
    tensao: {
        tipoTensao: '', //Trifasico ou Monofasico
        bobinas: [
            {
                tipoBobina: 'TRABALHO', //UNICO, TRABALHO, AUXILIAR
                fio: {
                    awgs: [0],
                    quantidades: [0],
                    espiras: [0]
                },
                passo: [0]
            },
            {
                tipoBobina: 'AUXILIAR', //UNICO, TRABALHO, AUXILIAR
                fio: {
                    awgs: [0],
                    quantidades: [0],
                    espiras: [0]
                },
                passo: [0]
            },
            {
                tipoBobina: 'UNICO', //UNICO, TRABALHO, AUXILIAR
                fio: {
                    awgs: [0],
                    quantidades: [0],
                    espiras: [0]
                },
                passo: [0]
            }
        ]
    },
    peso: 0,
    voltagens: [],
    amperagens: [],
    usuario: {},
    imagem: {
        dados: null,
        nome: null,
        tipo: null
    }
};

const initialCheckboxVolts = [
    { volts: 127, checked: false },
    { volts: 220, checked: false },
    { volts: 380, checked: false },
    { volts: 440, checked: false },
    { volts: 760, checked: false },
];

const MotorRegister = () => {

    const [motor, setMotor] = useState(initialState);
    const [checkboxVolts, setCheckboxVolts] = useState(initialCheckboxVolts);
    const [loading, setLoading] = useState(false);
    const [empresas, setEmpresas] = useState([]);
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
    const { showMessageSuccess, showMessageAlert, showMessageError, toast } = useToast();
    const { authUser } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const motorService = useMemo(() => new MotorService(), []);

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

        if (hasAllTrifasicVoltages) {
            newBobinas = [{
                tipoBobina: 'UNICO',
                fio: { awgs: [0], quantidades: [0], espiras: [0] },
                passo: [0]
            }];
        } else if (hasMonofasicVoltage) {
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
        motorService.empresas().then(response => {
            setEmpresas([...response.data]);
        })

        validateCheckbox();
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
            if (updatedBobina.fio[propriedade]) {
                updatedBobina.fio[propriedade] = updatedBobina.fio[propriedade].slice(0, -1);
            }
        });

        // Remove o último elemento do array "passo" se existir
        if (propriedades.includes('passo')) {
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

    const resetState = () => {
        setMotor(initialState);
        setCheckboxVolts(initialCheckboxVolts);
        setSelectedFile(null);

    }

    const load = () => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
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

        const {
            marca,
            modelo,
            ranhuras,
            rotacao,
            ligacao,
            potencia,
            comprimento,
            medidaInterna,
            empresa,
            imagem,
            peso,
            tensao: { tipoTensao, bobinas },
            voltagens,
            amperagens
        } = motor;

        const motorInsert = {
            marca,
            modelo,
            ranhuras: parseInt(ranhuras),
            rotacao: parseInt(rotacao),
            ligacao,
            potencia: parseInt(potencia),
            comprimento: parseInt(comprimento),
            medidaInterna: parseInt(medidaInterna),
            empresa,
            imagem,
            peso: parseFloat(peso),
            tensao: {
                tipoTensao: tipoTensao,
                bobinas: bobinas.map((bobina) => ({
                    tipoBobina: bobina.tipoBobina,
                    fio: {
                        awgs: bobina.fio.awgs.map(parseAsIntIfString),
                        quantidades: bobina.fio.quantidades.map(parseAsIntIfString),
                        espiras: bobina.fio.espiras.map(parseAsIntIfString)
                    },
                    passo: bobina.passo.map(parseAsIntIfString),
                })),
            },
            voltagens: voltagens.sort().map(parseAsIntIfString),
            amperagens: amperagens.map(parseAsFloatIfString),
            usuario: authUser.id,
        };

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
            const emptyImage = new File([new Blob()], 'semimagem.png', { type: 'image/png' });
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
                console.log(error.response)
                showMessageError(error.response.data);
            });


        console.log(motorInsert)
    }

    return (
        <MotorRegisterForm
            motor={motor}
            checkboxVolts={checkboxVolts}
            indexPassoAuxiliar={indexPassoAuxiliar}
            indexPassoTrabalho={indexPassoTrabalho}
            indexPassoUnico={indexPassoUnico}
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
            create={create}
            loading={loading}
            toast={toast}
        />
    )

}
export default MotorRegister;
