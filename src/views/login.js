import React from "react";
import Card from '../components/card'
import FormGroupLogin from "../components/form-group-login";

class Login extends React.Component {

    state = {
        login: '',
        password: ''
    }

    enter = () => {
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <div>
                            <div className="bs-docs-section">
                                <Card title="ELETROMOTORES" >
                                    <div className="row mb-1">
                                        <div className="col-lg-12">
                                            <div className="bs-component">

                                                <FormGroupLogin label="Login" htmlFor="floatingInput">
                                                    <input type="email" value={this.state.login} onChange={e => this.setState({login: e.target.value})} className="form-control" id="floatingInput" placeholder="name@example.com" />
                                                </FormGroupLogin>

                                                <FormGroupLogin label="Password" htmlFor="floatingPassword">
                                                    <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} className="form-control" id="floatingPassword" placeholder="Password"/>
                                                </FormGroupLogin>

                                                <button onClick={this.enter()} type="button" className="btn btn-primary">Entrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default Login