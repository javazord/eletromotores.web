import React from "react"


export function Role(props) {
    if (props.role == "ADMIN") {
        return "Administrador"
    }

    if (props.role == "USER") {
        return "Usuário"
    }
}

export function Condition(props) {
    if (props.condition) {
        return "Ativado"
    } else {
        return "Desativado"
    }
}

