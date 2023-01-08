import React from "react";
import { Tensao } from "./motorAttributes";

export default props => {

    const rows = props.motores.map(motor => {
        return (
            <tr key={motor.id}>
                <td>{motor.marca}</td>

                <td>{motor.modelo}</td>

                <td>{Tensao(motor)}</td>

                <td>{motor.rotacao}</td>

                <td>{motor.ranhuras}</td>

                <td>{motor.medidaInterna}</td>

                <td>{motor.medidaExterna}</td>
                <td>
                    <i className="pi pi-eye m-1" ></i>
                    <i className="pi pi-file-edit m-1" ></i>
                    
                </td>
            </tr>
        )
    })

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="bs-component">
                    <table className="table table-hover text-center">
                        <thead>
                            <tr>
                                <th scope="col">Marca</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">Tensão</th>
                                <th scope="col">Rotação</th>
                                <th scope="col">Ranhuras</th>
                                <th scope="col">M. Interna</th>
                                <th scope="col">M. Externa</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )


}