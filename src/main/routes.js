import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";
import UserRegister from "../views/user/userRegister";
import UserSearch from "../views/user/userSearch";
import MotorSearch from "../views/motor/motorSearch"
import MotorRegister from "../views/motor/motorRegister";
import { AuthConsumer } from "./authProvider";

function RotaAutenticada({ component: Component, autenticationUser, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            
            if (autenticationUser) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Navigate to="/" state={ {from: componentProps.location }} />
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
                <RotaAutenticada autenticationUser={props.autenticationUser} path='/home' element={<Home />} />
                <RotaAutenticada autenticationUser={props.autenticationUser} path="/buscar-colaboradores" element={<UserSearch />} />
                <RotaAutenticada autenticationUser={props.autenticationUser} path='/cadastro-colaboradores' element={<UserRegister />} />
                <RotaAutenticada autenticationUser={props.autenticationUser} path='/buscar-motores' element={<MotorSearch />} />
                <RotaAutenticada autenticationUser={props.autenticationUser} path='/cadastro-motores' element={<MotorRegister />} />
            </Routes>
        </Router>

    )
}
export default () => (
    <AuthConsumer>
        {
            (context) => (<Rotas autenticationUser={context.authenticated}/>)
        }
    </AuthConsumer>
)