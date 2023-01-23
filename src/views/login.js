import React, { Component } from "react";
import Card from '../components/card'
import FormGroupLogin from "../components/grid/form-group-login";
import UserService from '../app/service/user/userService';
import { useNavigate } from "react-router-dom";
import LocalStorageService from "../app/localStorage";
import { showMessageError } from "../components/toastr";
import HandleInputChange from '../components/events/handleInputChange'
import Row from '../components/grid/row';
import Col from '../components/grid/col';
import { AuthContext} from '../main/authProvider'


class Login extends Component {

    state = {
        login: '',
        password: ''
    }

    constructor(){
        super();
        this.service = new UserService();
    }

    enter = () => {
        this.service.authenticate({
            login: this.state.login,
            password: this.state.password
        }).then( response => {
            this.context.beginSession(response.data)
            this.props.navHook('/home')
        }).catch(erro => {
            showMessageError(erro.response.data)
        })


    }

    render() {
        return (
                <Row>
                    <Col className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <div>

                            <Card title="Autenticar" >
                                <div className="row mb-1">
                                    <div className="col-lg-12">

                                            <FormGroupLogin label="Login" htmlFor="floatingInput">
                                                <input type="email" value={this.state.login} name="login" onChange={e => this.setState({ login: e.target.value})} className="form-control" id="floatingInput" placeholder="name@example.com" />
                                            </FormGroupLogin>

                                            <FormGroupLogin label="Senha" htmlFor="floatingPassword">
                                                <input type="password" value={this.state.password} name="password" onChange={e => this.setState({ password: e.target.value})} className="form-control" id="floatingPassword" placeholder="Password" />
                                            </FormGroupLogin>

                                            <FormGroupLogin>
                                                <button onClick={this.enter} type="button" className="btn btn-primary">Entrar</button>
                                            </FormGroupLogin>


                                    </div>
                                </div>
                            </Card>

                        </div>
                    </Col>
                </Row>
        )

    }
}

function myParams(Component) {
    return props => <Component navHook={useNavigate()} />;
}
Login.contextType = AuthContext;
export default myParams(Login)