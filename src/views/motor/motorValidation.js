import ValidateError from "../../app/exception/validateError";

export function Tensao(props) {
    if (props.tensao.tipoTensao === "TRIFASICO") {
        return "Trifásico"
    }

    if (props.tensao.tipoTensao === "MONOFASICO") {
        return "Monofásico"
    }
}

export function isValidNumber(value) {
    return value !== undefined && value !== null && value !== "" && !isNaN(value) && value > 0;
}

export function isValidString(value) {
    return value !== "";
}

export function validate(motor) {
    const msgs = {};

    if (!isValidString(motor.marca)) {
        msgs.marca = 'Informe uma marca';
    }
    if (motor.marca.length > 10) {
        msgs.marca = 'A marca pode ter no máximo 10 dígitos';
    }

    if (motor.modelo.length > 10) {
        msgs.modelo = 'O modelo pode ter no máximo 10 dígitos';
    }

    if (!isValidNumber(motor.ranhuras)) {
        msgs.ranhuras = 'Informe um número de ranhuras válido';
    }

    if (!isValidNumber(motor.peso)) {
        msgs.peso = 'Informe um peso válido';
    }

    if (!isValidNumber(motor.comprimento)) {
        msgs.comprimento = 'Informe um comprimento válido';
    }

    if (!isValidNumber(motor.medidaInterna)) {
        msgs.medidaInterna = 'Informe uma medida interna válida';
    }

    motor.tensao.bobinas.forEach((bobina, index) => {
        if (!isValidNumber(bobina.fio.awgs[0])) {
            msgs[`awg${index}`] = 'Informe um número de AWG válido';
        }

        if (!isValidNumber(bobina.fio.quantidades[0])) {
            msgs[`quantidade${index}`] = 'Informe uma quantidade válida';
        }

        if (!isValidNumber(bobina.fio.espiras[0])) {
            msgs[`espiras${index}`] = 'Informe um número de espiras válido';
        }

        if (!isValidNumber(bobina.passo[0])) {
            msgs[`passo${index}`] = 'Informe um passo válido';
        }
    });

    motor.voltagens.forEach((volts, index) => {
        if (!isValidNumber(volts)) {
            msgs[`voltagem${index}`] = 'Informe uma voltagem válida';
        }
    });

    if (!isValidString(motor.tensao.eTensao)) {
        msgs.tensao = 'Selecione a voltagem para informar uma tensão';
    }

    if (!isValidString(motor.ligacao)) {
        msgs.ligacao = 'Informe a ligação';
    }

    if (!isValidString(motor.empresa)) {
        msgs.empresa = 'Informe uma empresa';
    }

    const firstKey = Object.keys(msgs)[0];

    if (firstKey) {
        throw new ValidateError(msgs[firstKey]);
    }
}

