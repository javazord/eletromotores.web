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
    const msgs = {};

    if (!user.login) {
        msgs.login = 'Informe um login';
    }
    if (user.login.length > 10) {
        msgs.login = 'O login deve ter no máximo 10 dígitos';
    }
    if (!user.password) {
        msgs.password = 'Informe uma senha';
    }
    if (user.password !== user.repeatPassword || !user.repeatPassword) {
        msgs.repeatPassword = 'As senhas informadas não coincidem';
    }

    // Validação da senha
    if (user.password) {
        const passwordRegex = /^(?=.*\d)(?=.*[@#$!%^&*])[A-Za-z\d@#$!%^&*]{8,10}$/;
        if (!passwordRegex.test(user.password)) {
            msgs.passwordRegex = 'A senha não atende aos requisitos mínimos';
        }
    }

    const firstKey = Object.keys(msgs)[0];

    if (firstKey) {
        throw new ValidateError(msgs[firstKey]);
    }
}


export function loginValidate(user) {

    const msgs = [];

    if (!user.login || !user.password) {
        msgs.push("Informe um login e senha válidos!");
    }

    if (msgs.length > 0) {
        throw new ValidateError(msgs);
    }
}

