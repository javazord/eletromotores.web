import React from "react";
import UserService from "../../app/service/userService";
import Card from '../../components/card'
import FormGroup from '../../components/form-group-login'
import { showMessageSuccess } from "../../components/toastr";
import { showMessageError } from "../../components/toastr";
import UserTable from "./userTable";

class UserSearch extends React.Component {

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



    buttonSearch = () => {

        this.service.search(this.props.login)
            .then(response => {
                showMessageSuccess('mostrar tabela')
            }).catch(erro => {
                showMessageError(erro.response.data)
            })

    }

    render() {
        return (


            <Card title="Pesquisar">

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputLogin" >
                                <input type="text" className="form-control col-md-6" placeholder="Informe o login" id="inputLogin" />
                                <button className="btn btn-primary my-2" type="submit">Buscar</button>
                            </FormGroup>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <UserTable/>
                        

                    </div>
                </div>


            </Card>

        )
    }



}

export default UserSearch