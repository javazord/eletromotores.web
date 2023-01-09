import React from "react";
import { NavLink } from "react-router-dom";
import NavbarItem from "./navbar-item";

export default function Navbar() {

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
                    <h3 className="name">Craig David</h3>
                    <span className="country">Web Designer</span>
                </div>


                <div className="nav-menu">
                    <ul>

                        <NavbarItem href="/" label="Home"><span className="pi pi-home mr-3"></span></NavbarItem>

                        <li className="accordion">
                            <a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="collapsible">
                                <span className="pi pi-user mr-3"></span>Usuários
                            </a>
                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne">
                                <div>
                                    <ul>
                                        <NavbarItem href="/cadastro-colaboradores" label="Registrar"><span className="pi pi-user-plus mr-3 m-2"></span></NavbarItem>
                                        <NavbarItem href="/buscar-colaboradores" label="Pesquisar"><span className="pi pi-search mr-3 m-2"></span></NavbarItem>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="accordion">
                            <a href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" className="collapsible">
                                <a rel="icon" href="motor.png" src="icon/motor.png"/>Motores
                            </a>

                            <div id="collapseTwo" className="collapse" aria-labelledby="headingOne">
                                <div>
                                    <ul>
                                        <NavbarItem href="/cadastro-motores" label="Registrar" ><span className="pi pi-save mr-3 m-2"></span></NavbarItem>
                                        <NavbarItem href="/buscar-motores" label="Pesquisar"><span className="pi pi-search mr-3 m-2"></span></NavbarItem>
                                    </ul>
                                </div>
                            </div>

                        </li>
                        <li><a href="#"><span className="pi pi-sign-out mr-3"></span>Sign out</a></li>
                    </ul>
                </div>
            </div>

        </aside>



    )

}