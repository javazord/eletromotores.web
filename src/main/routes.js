import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";
import UserRegister from "../views/user/userRegister";
import UserSearch from "../views/user/userSearch";
import MotorSearch from "../views/motor/motorSearch"
import MotorRegister from "../views/motor/motorRegister";
import { AuthConsumer } from "./authProvider";

function RotaAutenticada({ component: Component, authUser, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            
            if (authUser) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Navigate to={{ pathname: '/', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}


function Rotas(props) {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <RotaAutenticada authUser={props.authenticated} path='/home' element={<Home />} />
                <RotaAutenticada authUser={props.authenticated} path="/buscar-colaboradores" element={<UserSearch />} />
                <RotaAutenticada authUser={props.authenticated} path='/cadastro-colaboradores' element={<UserRegister />} />
                <RotaAutenticada authUser={props.authenticated} path='/buscar-motores' element={<MotorSearch />} />
                <RotaAutenticada authUser={props.authenticated} path='/cadastro-motores' element={<MotorRegister />} />
            </Routes>
        </Router>

    )
}
export default () => (
    <AuthConsumer>
        {
            (context) => (<Rotas authUser={context.authenticated}/>)
        }
    </AuthConsumer>
)