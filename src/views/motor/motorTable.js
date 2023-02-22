import React from "react";
import { Tensao } from "./motorAttributes";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default props => {

    const button = (rowData) => {
        return <>
            <Button type="button" icon={"pi pi-eye"} className="p-button-sm p-button-text" onClick={e => props.view(rowData)} />
            <Button type="button" icon={"pi pi-user-edit"} className="p-button-sm p-button-text" />
        </>;
    };

    return (
        <div className="card">
            <DataTable value={props.motores} paginator scrollable scrollHeight="400px" rows={10} rowsPerPageOptions={[10, 25, 50]} width="400px" height="400px">
                <Column field="id" header="Id"></Column>
                <Column field="marca" header="Marca"></Column>
                <Column field="modelo" header="Modelo"></Column>
                <Column field={Tensao} header="Tensão"></Column>
                <Column field="rotacao" header="Rotação"></Column>
                <Column field="ranhuras" header="Ranhuras"></Column>
                <Column field="medidaInterna" header="Comprimento"></Column>
                <Column field="medidaExterna" header="M. Externa"></Column>
                <Column body={button} header="Ação"></Column>
            </DataTable>
        </div>
    );
    
}