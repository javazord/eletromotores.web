import React from "react";
import { NavLink } from "react-router-dom";
import LocalStorageService from "../app/localStorage";
import SidebarItem from "./sidebar-item";
import { Role } from "../views/user/userAttributes";


export default function Sidebar() {
    const usuarioLogado = LocalStorageService.getItem('_usuario_logado');
    return (
        

        <aside className="sidebar">
            <div className="toggle">
                <a href="#" className="burger js-menu-toggle" data-toggle="collapse" data-target="#main-navbar">
                    <span></span>
                </a>
            </div>
            <div className="side-inner">

                <div className="profile">
                    <img src="images/person_profile.jpg" alt="Image" className="img-fluid" />
                    <h3 className="name">{usuarioLogado.login}</h3>
                    <span className="country">{Role(usuarioLogado)}</span>
                </div>


                <div className="nav-menu">
                    <ul>

                        <SidebarItem href="/" label="Home"><span className="iconHome mr-3"></span></SidebarItem>

                        <li className="accordion">
                            <a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="collapsible">
                                <span className="iconUser mr-3" ></span>Usuários
                            </a>
                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne">
                                <div>
                                    <ul>
                                        <SidebarItem href="/cadastro-colaboradores" label="Registrar"><span className="iconAddUser mr-3 m-2"></span></SidebarItem>
                                        <SidebarItem href="/buscar-colaboradores" label="Pesquisar"><span className="iconSearchUser mr-3 m-2"></span></SidebarItem>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="accordion justify-content-center">
                            <a href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" className="collapsible">
                            <span className="iconMotor mr-3" ></span>Motores
                            </a>

                            <div id="collapseTwo" className="collapse" aria-labelledby="headingOne">
                                <div>
                                    <ul>
                                        <SidebarItem href="/cadastro-motores" label="Registrar" ><span className="iconMotor mr-3 m-2"></span></SidebarItem>
                                        <SidebarItem href="/buscar-motores" label="Pesquisar"><span className="iconSearchMotor mr-3 m-2"></span></SidebarItem>
                                    </ul>
                                </div>
                            </div>

                        </li>
                        <li><a href="#"><span className="iconLougot mr-3"></span>Sign out</a></li>
                    </ul>
                </div>
            </div>

        </aside>



    )

}