import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";
import UserRegister from "../views/userRegister";

 function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/cadastro-colaboradores' element={<UserRegister />} />
            </Routes>
        </Router>

    )
}
 export default Rotas;