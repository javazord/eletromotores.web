import React from "react";
import ValidateError from "../../app/exception/validateError";

export function Tensao(props) {
    if (props.tensao == "TRIFASICO") {
        return "Trifásico"
    }

    if (props.tensao == "MONOFASICO") {
        return "Monofásico"
    }
}

function isValidNumber(value) {
    return value !== undefined && value !== null && value !== "" && !isNaN(value) && value > 0;
}

function isValidString(value) {
    return value !== "";
}

export function validate(motor) {

    const msgs = []

    if (!isValidString(motor.marca)) {
        msgs.push('Informe uma marca')
    }
    if (!isValidNumber(motor.ranhuras)) {
        msgs.push('Informe um número de ranhuras válido')
    }
    if (!isValidNumber(motor.fio.peso)) {
        msgs.push('Informe um peso válido')
    }
    if (!isValidNumber(motor.comprimento)) {
        msgs.push('Informe um campo de comprimento válido')
    }
    if (!isValidNumber(motor.medidaExterna)) {
        msgs.push('Informe um campo de medida externa válido')
    }

    motor.fio.awgs.forEach(awg => {
        if (!isValidNumber(awg)) {
            msgs.push('Informe um número de AWG válido')
        }
    });

    motor.fio.quantidades.forEach(quantidade => {
        if (!isValidNumber(quantidade)) {
            msgs.push('Informe uma quantidade válida')
        }
    });

    motor.fio.espiras.forEach(espiras => {
        if (!isValidNumber(espiras)) {
            msgs.push('Informe um número de espiras válido')
        }
    });

    motor.voltagens.forEach(volts => {
        if (!isValidNumber(volts)) {
            msgs.push('Informe uma voltagem válida')
        }
    });

    if (!isValidString(motor.tensao)) {
        msgs.push('Selecione a voltagem para informar uma tensão')
    }

    if (!isValidString(motor.ligacao)) {
        msgs.push('Informe a ligação')
    }

    if (msgs && msgs.length > 0) {
        throw new ValidateError(msgs)
    }

}