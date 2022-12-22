import React from "react";

class UpdateUser extends React.Component{


    update = () => {
        const usuario = {
            login: this.state.login,
            password: this.state.password,
            condition: this.state.condition,
            role: this.state.role
        }

        this.service.put( usuario )
        .then(response => {
            showMessageSuccess('Usuário atualizado com sucesso!')
            this.handleReset()
        }).catch(erro => {
            showMessageError(erro.response.data)
        })
    }

}