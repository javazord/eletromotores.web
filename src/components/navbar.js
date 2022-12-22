import React from "react";
import NavbarItem from "./navbar-item";

export default function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">ELETROMOTORES</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">

                        <NavbarItem href="/" label="Home" />

                        <NavbarItem href="/#" label="Motores" />

                        <NavbarItem href="/cadastro-colaboradores" label="Colaboradores" />                        

                        <NavbarItem href="/login" label="Logar" />

                    </ul>
                    

                </div>
            </div>
        </nav>



    )

}