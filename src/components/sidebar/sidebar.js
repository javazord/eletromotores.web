import React from 'react';
import { AuthConsumer } from '../../main/authProvider';
import Content from '../../main/content';
import Rotas from '../../main/routes';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Sidebar = (props) => {

    const handleLogout = () => {
        // Chama a função de logout passada por props
        props.deslogar();
    };

    return (
        <>
            <div>
                <Navbar  collapseOnSelect expand="xl" className="bg-body-tertiary">
                    <Container >
                        <Navbar.Brand href="/home">Eletromotores</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    </Container>
                </Navbar>
                <div className="wrapper d-flex align-items-stretch">

                    <nav id="sidebar">
                        <div className="custom-menu">
                            <button type="button" id="sidebarCollapse" className="btn btn-primary">
                            </button>

                        </div>
                        <div className="img bg-wrap text-center py-4" style={{ backgroundImage: 'url(images/bg_1.jpg)' }}>
                            <div className="user-logo">
                                <div className="img" style={{ backgroundImage: 'url(images/logo.jpg)' }} />
                                <h3>{props.authUser.login}</h3>
                                <p>{props.authUser.role}</p>
                            </div>
                        </div><ul className="list-unstyled components mb-5">
                            <li className="active">
                                <a href="/home"><span className="fa fa-home mr-3" /> Home</a>
                            </li>
                            <li>
                                <a href="#userSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                    <span className='fa fa-users mr-3' />Colaboradores</a>
                                <ul className="collapse list-unstyled" id="userSubmenu">
                                    {props.authUser.role === "Administrador" &&
                                        <li>
                                            <a href="/cadastro-colaboradores"><span className='fa fa-pencil-square-o mr-3' />Registrar</a>
                                        </li>}
                                    <li>
                                        <a href="/buscar-colaboradores"><span className='fa fa-search mr-3' />Pesquisar</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#motorSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                    <span className='fa fa-bolt mr-3' />Motores</a>
                                <ul className="collapse list-unstyled" id="motorSubmenu">
                                    {props.authUser.role === "Administrador" &&
                                        <li>
                                            <a href="/cadastro-motores"><span className='fa fa-pencil-square-o mr-3' />Registrar</a>
                                        </li>}
                                    <li>
                                        <a href="/buscar-motores"><span className='fa fa-search mr-3' />Pesquisar</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/" onClick={handleLogout}><span className="fa fa-sign-out mr-3" />Sair</a>
                            </li>
                        </ul>
                    </nav >



                    {/* Page Content  */}
                    {props.children}

                </div >
            </div>


        </>
    )

}



const SidebarWrapper = () => (
    <AuthConsumer>
        {(context) => (
            <Sidebar autenticationUser={context.authenticated} authUser={context.authUser} deslogar={context.endSession}>
                <Content>
                    <Rotas />
                </Content>
            </Sidebar>
        )}
    </AuthConsumer>
);

export default SidebarWrapper;