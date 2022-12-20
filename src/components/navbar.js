import React from "react";

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
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Home
                                <span className="visually-hidden">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Registrar Motor</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pesquisar Motor</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Colaboradores</a>
                        </li>
                    </ul>
                    
                    
                </div>
            </div>
        </nav>

        

    )

}