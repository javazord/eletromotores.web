import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Login from "../views/login";
import UserRegister from "../views/userRegister";

export default function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/cadastro-colaboradores' element={<UserRegister />} />
            </Routes>
        </Router>

    )
}
