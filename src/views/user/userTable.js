import React from "react";
import { Role } from "./userAttributes";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default props => {

    const button = (rowData) => {
        return <>
            <Button type="button" icon={"pi pi-eye"} className="p-button-sm p-button-text" onClick={e => props.view(rowData)} />
            <Button type="button" icon={"pi pi-user-edit"} className="p-button-sm p-button-text" onClick={e => props.edit(rowData)} />
        </>;
    };

    return (
            <DataTable value={props.users} paginator scrollable stripedRows scrollHeight="400px" style={{ minWidth: '20rem' }} rows={10} rowsPerPageOptions={[10, 25, 50]} >
                <Column field="id" header="Id" ></Column>
                <Column field="login" header="Login"></Column>
                <Column field={Role} header="Função"></Column>
                <Column body={button} header="Ação"></Column>
            </DataTable>
    );



}