import React from "react";
import { Tensao } from "./motorValidation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Render from "../../components/grid/render";
import { Container } from "react-bootstrap";

const MotorTable = (props) => {
    const button = (rowData) => {
        return <>
            <Button type="button" icon={"pi pi-eye"} className="p-button-sm p-button-text" style={{ color: 'green' }} onClick={e => props.view(rowData)} tooltip="Visualizar" />
            <Render render={props.context.role === "Administrador"}>
                <Button type="button" icon={"pi pi-user-edit"} className="p-button-sm p-button-text" onClick={e => props.edit(rowData)} tooltip="Editar"/>
                <Button type="button" icon={"pi pi-trash"} className="p-button-sm p-button-text" style={{ color: 'red' }} onClick={e => props.delete(rowData)} tooltip="Deletar"/>
            </Render>
        </>;
    };

    return (
        <Container>
            <DataTable value={props.motores} paginator scrollable stripedRows scrollHeight="400px" rows={10} rowsPerPageOptions={[10, 25, 50]} width="400px" height="400px">
                <Column field="id" header="#Id" align={"center"}></Column>
                <Column field="marca" header="Marca" align={"center"}></Column>
                <Column field="modelo" header="Modelo" align={"center"}></Column>
                <Column field="potencia" header="Potencia" align={"center"}></Column>
                <Column field={Tensao} header="Tensão" align={"center"}></Column>
                <Column field="rotacao" header="Rotação" align={"center"}></Column>
                <Column field="ranhuras" header="Ranhuras" align={"center"}></Column>
                <Column field="comprimento" header="Comprimento" align={"center"}></Column>
                <Column field="medidaInterna" header="M. Interna" align={"center"}></Column>
                <Column field={rowData => button(rowData)} header="Ação" align={"center"} />
            </DataTable>
        </Container>

    );

}
export default MotorTable;