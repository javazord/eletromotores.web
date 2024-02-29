import React, { useState } from 'react';
import { AuthConsumer } from '../../main/authProvider';
import Content from '../../main/content';
import Rotas from '../../main/routes';
import { Navbar, Offcanvas, Button } from 'react-bootstrap';

const Sidebar = (props) => {

    const [showSidebar, setShowSidebar] = useState(false);
    const handleCloseSidebar = () => setShowSidebar(false);
    const handleShowSidebar = () => setShowSidebar(true);

    const handleLogout = () => {
        props.deslogar();
    };

    return (
        <>
            <div>
                <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
                    <Button className="btn btn-primary" variant='dark' onClick={handleShowSidebar}>
                        {/* Ícone do seu botão, por exemplo, usando FontAwesome */}
                        <span className="fa fa-bars"></span>
                    </Button>
                    <Navbar.Brand className='p-1' href="/home">Eletromotores</Navbar.Brand>

                </Navbar>

                <Offcanvas className="custom-offcanvas sidebar bg-dark text-white" show={showSidebar} onHide={handleCloseSidebar} placement="start" scroll={true} backdrop='false'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body className=''>
                        <div className="img bg-wrap text-center py-4" style={{ backgroundImage: 'url(images/bg_1.jpg)' }}>
                            <div className="user-logo">
                                <div className="img" style={{ backgroundImage: 'url(images/logo.png)' }} />
                                <h3>{props.authUser.login}</h3>
                                <p>{props.authUser.role}</p>
                            </div>
                        </div>
                        <ul className="list-unstyled components mb-5">
                            <li className="active">
                                <a href="/home"><span className="fa fa-home mr-3" /> Home</a>
                            </li>
                            <li>
                                <a href="#userSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                    <span className='fa fa-users mr-3' />Colaboradores
                                </a>
                                <ul className="collapse list-unstyled" id="userSubmenu">
                                    {props.authUser.role === "Administrador" && (
                                        <li>
                                            <a href="/cadastro-colaboradores"><span className='fa fa-pencil-square-o mr-3' />Registrar</a>
                                        </li>
                                    )}
                                    <li>
                                        <a href="/buscar-colaboradores"><span className='fa fa-search mr-3' />Pesquisar</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#motorSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                    <span className='fa fa-bolt mr-3' />Motores
                                </a>
                                <ul className="collapse list-unstyled" id="motorSubmenu">
                                    {props.authUser.role === "Administrador" && (
                                        <li>
                                            <a href="/cadastro-motores"><span className='fa fa-pencil-square-o mr-3' />Registrar</a>
                                        </li>
                                    )}
                                    <li>
                                        <a href="/buscar-motores"><span className='fa fa-search mr-3' />Pesquisar</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/" onClick={handleLogout}><span className="fa fa-sign-out mr-3" />Sair</a>
                            </li>
                        </ul>
                    </Offcanvas.Body>


                </Offcanvas>
            </div>


            {/* Page Content  */}
            {props.children}
        </>
    );
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