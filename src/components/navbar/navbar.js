import React from "react";
import NavbarItem from "./navbar-item";
import { AuthConsumer } from "../../main/authProvider";
import NavbarRender from "./navbar-render";
import NavbarDrop from "./navbar-drop";
import NavbarDropItem from "./navbar-drop-item";

export function Navbar(props) {

    return (
        <NavbarRender render={props.autenticationUser}>
            <div className="container-xl">
                <a className="navbar-brand" href="/home">Eletromotores</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse " id="navbarsExample07XL">
                    <ul className="navbar-nav d-flex justify-content-end">
                        <NavbarItem href="/home" label="Home"></NavbarItem>

                        <NavbarDrop render={props.autenticationUser} label="Colaborador">
                            <NavbarDropItem href="/cadastro-colaboradores" label="Cadastrar"></NavbarDropItem>
                            <NavbarDropItem href="/buscar-colaboradores" label="Pesquisar"></NavbarDropItem>
                        </NavbarDrop>

                        <NavbarDrop render={props.autenticationUser} label="Motor">
                            <NavbarDropItem href="/cadastro-motores" label="Cadastrar"></NavbarDropItem>
                            <NavbarDropItem href="/buscar-motores" label="Pesquisar"></NavbarDropItem>
                        </NavbarDrop>
                        <NavbarItem className="" href="/home" label="Sair" onClick={props.deslogar}></NavbarItem>
                    </ul>

                </div>
            </div>
        </NavbarRender>


    )

}

export default () => (
    <AuthConsumer>
        {(context) => (
            <><Navbar autenticationUser={context.authenticated} deslogar={context.endSession} />
                <NavbarDrop autenticationUser={context.authenticated} /></>
        )}
    </AuthConsumer>
)