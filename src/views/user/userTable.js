import React from "react";
import { Condition, Role } from "./userAttributes";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Render from "../../components/grid/render";

export default props => {
    const ADMIN = 'Administrador'
    const button = (rowData) => {
        return <Button type="button" icon={"pi pi-user-edit"} className="p-button-sm p-button-text" onClick={e => props.edit(rowData)} />
    };

    return (
        <DataTable value={props.users} paginator scrollable stripedRows scrollHeight="400px" 
        style={{ minWidth: '20rem' }} rows={10} rowsPerPageOptions={[10, 25, 50]} 
        emptyMessage="Nenhum resultado encontrado">
            <Column field="id" header="Id" align={"center"}></Column>
            <Column field="login" header="Login" align={"center"}></Column>
            <Column field={Role} header="Função" align={"center"}></Column>
            <Column field={Condition} header="Condição" align={"center"}></Column>
            {props.context.role === ADMIN && (
                <Column body={button} header="Ação" align="center" />
            )}

        </DataTable>
    );

}


