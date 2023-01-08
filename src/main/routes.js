import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";
import UserRegister from "../views/user/userRegister";
import UserSearch from "../views/user/userSearch";
import UserTable from "../views/user/userTable";
import MotorSearch from "../views/motor/motorSearch"
import MotorRegister from "../views/motor/motorRegister";

 function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path="/buscar-colaboradores" element={<UserSearch/>}/>
                <Route path='/cadastro-colaboradores' element={<UserRegister />} />
                <Route path='/buscar-motores' element={<MotorSearch />} />
                <Route path='/cadastro-motores' element={<MotorRegister />} />
            </Routes>
        </Router>

    )
}
 export default Rotas;