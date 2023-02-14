import React from "react";
import SidebarItem from "./sidebar-item";
import { AuthConsumer } from "../../main/authProvider";
import Aside from "./aside";

export function Navbar(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Ninth navbar example">
            <div className="container-xl">
                <a className="navbar-brand" href="/home">Eletromotores</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample07XL">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdown07XL" data-bs-toggle="dropdown" aria-expanded="false">Usuario</a>
                            <ul className="dropdown-menu" aria-labelledby="dropdown07XL">
                                <li><a className="dropdown-item" href="/cadastro-colaboradores">Cadastrar</a></li>
                                <li><a className="dropdown-item" href="/buscar-colaboradores">Pesquisar</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdown07XL" data-bs-toggle="dropdown" aria-expanded="false">Motores</a>
                            <ul className="dropdown-menu" aria-labelledby="dropdown07XL">
                                <li><a className="dropdown-item" href="/cadastro-motores">Cadastrar</a></li>
                                <li><a className="dropdown-item" href="/buscar-motores">Pesquisar</a></li>
                            </ul>
                        </li>
                        <div className="">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/">Sair</a>
                            </li>
                        </div>
                    </ul>

                </div>
            </div>
        </nav>


    )

}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar autenticationUser={context.authenticated} deslogar={context.endSession} />
        )}
    </AuthConsumer>
)