import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";
import UserRegister from "../views/user/userRegister";
import UserSearch from "../views/user/userSearch";
import MotorSearch from "../views/motor/motorSearch"
import MotorRegister from "../views/motor/motorRegister";
import { AuthConsumer } from "./authProvider";

const RotaAutenticada = ({ children, autenticationUser, redirectTo }) => {
    return autenticationUser ? children : <Navigate to={redirectTo} />
}

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<RotaAutenticada autenticationUser={!props.autenticationUser} redirectTo={"/home"}> <Login /> </RotaAutenticada>} />

                <Route exact path="/update-password" />

                <Route exact path="/home" element={<RotaAutenticada autenticationUser={props.autenticationUser} redirectTo={"/"}> <Home /> </RotaAutenticada>} />

                <Route exact path="/buscar-colaboradores" element={<RotaAutenticada autenticationUser={props.autenticationUser} redirectTo={"/"}> <UserSearch /> </RotaAutenticada>} />

                <Route exact path="/cadastro-colaboradores" element={<RotaAutenticada autenticationUser={props.autenticationUser} redirectTo={"/"}> <UserRegister /> </RotaAutenticada>} />

                <Route exact path="/buscar-motores" element={<RotaAutenticada autenticationUser={props.autenticationUser} redirectTo={"/"}> <MotorSearch /> </RotaAutenticada>} />

                <Route exact path="/cadastro-motores" element={<RotaAutenticada autenticationUser={props.autenticationUser} redirectTo={"/"}> <MotorRegister /> </RotaAutenticada>} />
            </Routes>
        </BrowserRouter>
    )
}

export default () => (
    <AuthConsumer>
        {
            (context) => (<Rotas autenticationUser={context.authenticated} />)
        }
    </AuthConsumer>
)