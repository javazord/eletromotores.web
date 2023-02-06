import React from "react";
import { BrowserRouter as Router, Routes, Route,  Navigate, BrowserRouter } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";
import UserRegister from "../views/user/userRegister";
import UserSearch from "../views/user/userSearch";
import MotorSearch from "../views/motor/motorSearch"
import MotorRegister from "../views/motor/motorRegister";
import { AuthConsumer } from "./authProvider";

const RotaAutenticada = ({ children, autenticationUser, redirectTo }) => {
    console.log(autenticationUser)
    return autenticationUser ? children : <Navigate to={redirectTo} />
}

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={ <Login /> } />
                <Route exact path="/home" element={ <RotaAutenticada autenticationUser={props.autenticationUser} redirectTo={"/"}> <Home /> </RotaAutenticada>} />
                <Route exact path="/buscar-colaboradores"  element={<RotaAutenticada autenticationUser={props.autenticationUser} redirectTo={"/"}> <UserSearch /> </RotaAutenticada> } />
                <Route exact path="/cadastro-colaboradores" autenticationUser={props.autenticationUser} element={<RotaAutenticada redirectTo={"/"}> <UserRegister /> </RotaAutenticada>} />
                <Route exact path="/buscar-motores" autenticationUser={props.autenticationUser} element={<RotaAutenticada redirectTo={"/"}> <MotorSearch /> </RotaAutenticada>} />
                <Route exact path="/cadastro-motores" autenticationUser={props.autenticationUser} element={<RotaAutenticada redirectTo={"/"}> <MotorRegister /> </RotaAutenticada>} />
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