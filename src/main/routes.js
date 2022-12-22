import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";
import UserRegister from "../views/userRegister";

 function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path='/login' component={ Login } />
                <Route path='/' component={ Home } />
                <Route path='/cadastro-colaboradores' component={UserRegister} />
            </Switch>
        </HashRouter>

    )
}
 export default Rotas;