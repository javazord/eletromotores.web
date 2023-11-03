import ValidateError from "../../app/exception/validateError"


export function Role(props) {
    if (props.role === "ADMIN") {
        return "Administrador"
    }

    if (props.role === "USER") {
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
    if (user.login.length > 10) {
        msgs.push('O login deve ter no máx 10 digitos')
    }
    if (!user.password) {
        msgs.push('Informe uma senha')
    }
    if (user.password !== user.repeatPassword || !user.repeatPassword) {
        msgs.push('A senhas informadas não conhecidem')
    }

    // Validação da senha
    if (user.password) {
        const passwordRegex = /^(?=.*\d)(?=.*[@#$!%^&*])[A-Za-z\d@#$!%^&*]{8,12}$/;
        if (!passwordRegex.test(user.password)) {
            msgs.push('A senha não atende os requisitos mínimos');
        }
    }

    if (msgs && msgs.length > 0) {
        throw new ValidateError(msgs)
    }

}

export function loginValidate(user) {

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

