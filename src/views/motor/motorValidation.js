import ValidateError from "../../app/exception/validateError";

export function Tensao(props) {
    if (props.tensao === "TRIFASICO") {
        return "Trifásico"
    }

    if (props.tensao === "MONOFASICO") {
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
    if (!isValidNumber(motor.fio.peso)) {
        msgs.peso = 'Informe um peso válido';
    }
    if (!isValidNumber(motor.comprimento)) {
        msgs.comprimento = 'Informe um campo de comprimento válido';
    }
    if (!isValidNumber(motor.medidaExterna)) {
        msgs.medidaExterna = 'Informe um campo de medida externa válido';
    }

    motor.fio.awgs.forEach((awg, index) => {
        if (!isValidNumber(awg)) {
            msgs[`awg${index}`] = 'Informe um número de AWG válido';
        }
    });

    motor.fio.quantidades.forEach((quantidade, index) => {
        if (!isValidNumber(quantidade)) {
            msgs[`quantidade${index}`] = 'Informe uma quantidade válida';
        }
    });

    motor.fio.espiras.forEach((espiras, index) => {
        if (!isValidNumber(espiras)) {
            msgs[`espiras${index}`] = 'Informe um número de espiras válido';
        }
    });

    motor.passo.forEach((passo, index) => {
        if (!isValidNumber(passo)) {
            msgs[`passo${index}`] = 'Informe um passo válido';
        }
    });

    motor.voltagens.forEach((volts, index) => {
        if (!isValidNumber(volts)) {
            msgs[`voltagem${index}`] = 'Informe uma voltagem válida';
        }
    });

    if (!isValidString(motor.tensao)) {
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
