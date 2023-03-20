import React from 'react';
import { Menubar } from 'primereact/menubar';
import Render from '../grid/render';
import { AuthConsumer } from "../../main/authProvider";

export function MenuBar(props) {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            url: '/home'
        },
        {
            label: 'Usuário',
            icon: 'pi pi-fw pi-user',
            items: [
                props.authUser && props.authUser.role == "Administrador" ? {
                    label: 'Novo',
                    icon: 'pi pi-fw pi-user-plus',
                    url: '/cadastro-colaboradores',
                } : null,
                {
                    label: 'Pesquisar',
                    icon: 'pi pi-fw pi-users',
                    url: '/buscar-colaboradores',
                },
            ].filter(item => item !== null),

        },
        {
            label: 'Motor',
            icon: 'pi pi-fw pi-bolt',
            items: [
                props.authUser && props.authUser.role == "Administrador" ? {
                    label: 'Novo',
                    icon: 'pi pi-fw pi-cog',
                    url: '/cadastro-motores'
                } : null,
                {
                    label: 'Pesquisar',
                    icon: 'pi pi-fw pi-search',
                    url: '/buscar-motores'
                }
            ].filter(item => item !== null),
        },
        {
            label: 'Sair',
            icon: 'pi pi-fw pi-power-off',
            url: '/',
            command: props.deslogar
        }
    ];

    const start = (
        <a href='/home' style={{ color: 'black', textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="logo" src="https://cdn-icons-png.flaticon.com/512/2362/2362738.png" height="40" className="mr-2" />
                <span style={{ fontSize: '1.3rem' }} className="m-1" > Eletromotores</span>
            </div>
        </a>

    );

    const end = [
        {
            label: 'Sair',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    return (

        <Render render={props.autenticationUser}>
            <div className="card">
                <Menubar model={items} start={start} />
            </div>
        </Render>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <MenuBar autenticationUser={context.authenticated} authUser={context.authUser} deslogar={context.endSession} />

        )}
    </AuthConsumer>
)