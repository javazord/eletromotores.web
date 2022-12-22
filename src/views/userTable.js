import React from "react";
import UserService from "../app/service/userService";

class UserTable extends React.Component {

    state = {
        login: '',
        password: '',
        condition: null,
        role: null
    }

    constructor() {
        super();
        this.service = new UserService();
    }



    componentDidMount() {

        this.service.get()
            .then(response => {
                showMessageSuccess('mostrar tabela')
            }).catch(erro => {
                showMessageError(erro.response.data)
            })

    }

    render() {
        return (


            <div></div>








        )
    }



}
export default UserTable