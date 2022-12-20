import React from "react";
import Card from '../components/card'
import FormGroupLogin from "../components/form-group-login";
import axios from "axios";

class Login extends React.Component {

    state = {
        login: '',
        password: '',
        role: '',
        alert: null
    }

    enter = async () => {
        const response = await axios.post('http://localhost:9000/eletromotores/api/usuarios/autenticar', {
            login: this.state.login,
            password: this.state.password,
            role: this.state.role
        }).then( response => {
            this.props.history.push('/')
        }).catch(erro => {
            this.setState({ alert: erro.response.data })
        })
    }

    render() {
        return (
            <div className="bs-docs-section">
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <div>

                            <Card title="Login" >
                                <div className="row mb-1">
                                    <div className="col-lg-12">
                                        <div className="bs-component">

                                            <FormGroupLogin label="Login" htmlFor="floatingInput">
                                                <input type="email" value={this.state.login} onChange={e => this.setState({ login: e.target.value })} className="form-control" id="floatingInput" placeholder="name@example.com" />
                                            </FormGroupLogin>

                                            <FormGroupLogin label="Senha" htmlFor="floatingPassword">
                                                <input type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} className="form-control" id="floatingPassword" placeholder="Password" />
                                            </FormGroupLogin>

                                            <FormGroupLogin>
                                                <button onClick={this.enter} type="button" className="btn btn-primary">Entrar</button>
                                            </FormGroupLogin>



                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <span>{this.state.alert}</span>

                        </div>
                    </div>
                </div>
                
            </div>
        )



    }
}
export default Login;