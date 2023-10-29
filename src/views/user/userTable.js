import React from "react";
import { Condition, Role } from "./userAttributes";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default props => {
    const button = (rowData) => {
        return <Button type="button" icon={"pi pi-user-edit"} className="p-button-sm p-button-text" onClick={e => props.edit(rowData)} />
    };

    return (
        <div>
            <DataTable value={props.users} paginator scrollable stripedRows scrollHeight="400px" rows={10} rowsPerPageOptions={[10, 25, 50]} width="400px" height="400px">
                <Column field="id" header="Id" align={"center"}></Column>
                <Column field="login" header="Login" align={"center"}></Column>
                <Column field={Role} header="Função" align={"center"}></Column>
                <Column field={Condition} header="Condição" align={"center"}></Column>
                {props.context.role === 'Administrador' && (
                    <Column body={button} header="Ação" align="center" />
                )}

            </DataTable>
        </div>

    );

}


