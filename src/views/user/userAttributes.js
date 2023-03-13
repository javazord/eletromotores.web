import ValidateError from "../../app/exception/validateError"


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

export function Validate(user) {

    const msgs = []

    if (!user.login) {
        msgs.push('Informe um login')
    }
    if (!user.password) {
        msgs.push('Informe uma senha')
    }
    if (user.password !== user.repeatPassword || !user.repeatPassword) {
        msgs.push('A senhas informadas não conhecidem')
    }

    if (msgs && msgs.length > 0) {
        throw new ValidateError(msgs)
    }

}

export function loginValidate(user){

    const msgs = []

    if (!user.login || user.login === '') {
        msgs.push('Informe um login')
    }
    if (!user.password || user.password === '') {
        msgs.push('Informe uma senha')
    }

    if (msgs && msgs.length > 0) {
        throw new ValidateError(msgs)
    }
}

