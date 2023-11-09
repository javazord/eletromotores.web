import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { AuthContext } from "../../main/authProvider";
import { validate } from "./motorValidation";
import { MotorService } from "../../app/service/motor/motorService";
import useToast from "../../components/toast";
import MotorForm from "./motorForm";


const initialState = {
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
    const [indexPasso, setIndexPasso] = useState(1);
    const [indexAWG, setIndexAWG] = useState(1)
    const [indexESP, setIndexESP] = useState(1)
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

        if (hasAllTrifasicVoltages) {
            setMotor((prevMotor) => ({ ...prevMotor, tensao: updatedList.includes(127) ? '' : 'TRIFASICO' }));
        } else if (hasMonofasicVoltage) {
            const hasOtherVoltages = updatedList.some((voltage) => voltage === 380 || voltage === 440 || voltage === 760);
            setMotor((prevMotor) => ({ ...prevMotor, tensao: hasOtherVoltages ? '' : 'MONOFASICO' }));
        } else {
            setMotor((prevMotor) => ({ ...prevMotor, tensao: '' }));
        }
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

    const resetState = () => {
        setMotor(initialState);
        setSelectedFile(null);
        setCheckboxVolts(initialCheckboxVolts);
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
                showMessageError(error.response.data);
            });
    }

    return (
        <MotorForm
            motor={motor}
            checkboxVolts={checkboxVolts}
            addInputsESP={addInputsESP}
            removeInputsESP={removeInputsESP}
            handleInputChange={handleInputChange}
            handleInputChangePeso={handleInputChangePeso}
            handleChangePasso={handleChangePasso}
            addInputsPasso={addInputsPasso}
            removeInputsPasso={removeInputsPasso}
            addInputs={addInputs}
            removeInputs={removeInputs}
            handleChangeAWG={handleChangeAWG}
            handleChangeQTD={handleChangeQTD}
            handleChangeESP={handleChangeESP}
            handleCheckboxChange={handleCheckboxChange}
            handleFileChange={handleFileChange}
            empresas={empresas}
            create={create}
            loading={loading}
            toast={toast}
        />
    )

}
export default MotorRegister;
