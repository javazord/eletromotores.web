import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";
import UserRegister from "../views/user/userRegister";
import UserSearch from "../views/user/userSearch";
import MotorSearch from "../views/motor/motorSearch"
import MotorRegister from "../views/motor/motorRegister";
import { AuthConsumer } from "./authProvider";

const RotaAutenticada = ({ children, autenticationUser, authUserRole, role, redirectTo }) => {
    return autenticationUser && authUserRole === role ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    );
}

const Rotas = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<RotaAutenticada autenticationUser={!props.autenticationUser} redirectTo={"/home"}> <Login /> </RotaAutenticada>} />

                <Route exact path="/home" element={<RotaAutenticada autenticationUser={props.autenticationUser} redirectTo={"/"}> <Home /> </RotaAutenticada>} />

                <Route exact path="/buscar-colaboradores" element={<RotaAutenticada autenticationUser={props.autenticationUser}  redirectTo={"/"}> <UserSearch /> </RotaAutenticada>} />

                <Route exact path="/cadastro-colaboradores" element={<RotaAutenticada autenticationUser={props.autenticationUser} authUserRole={props.authUserRole} role={'Administrador'} redirectTo={"/"}> <UserRegister /> </RotaAutenticada>} />

                <Route exact path="/buscar-motores" element={<RotaAutenticada autenticationUser={props.autenticationUser} redirectTo={"/"}> <MotorSearch /> </RotaAutenticada>} />

                <Route exact path="/cadastro-motores" element={<RotaAutenticada autenticationUser={props.autenticationUser} authUserRole={props.authUserRole} role={'Administrador'} redirectTo={"/"}> <MotorRegister /> </RotaAutenticada>} />
            </Routes>
        </BrowserRouter>
    )
}

const MyComponent = () => (
    <AuthConsumer>
        {(context) => (<Rotas autenticationUser={context.authenticated} authUserRole={context.authUser?.role}/>)}
    </AuthConsumer>
);

export default MyComponent;