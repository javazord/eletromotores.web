import React from "react"


export function Role(props) {
    if (props.role == "ROLE_ADMIN") {
        return "Administrador"
    }

    if (props.role == "ROLE_USER") {
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

