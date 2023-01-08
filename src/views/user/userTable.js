import React from "react";
import { Role } from "./userAttributes";
import { Condition } from "./userAttributes";
import Row from '../../components/row';
import Col from '../../components/col';

export default props => {

    const rows = props.users.map(user => {
        return (
            <tr key={user.id}>
                <td>{user.login}</td>

                <td>{Role(user)}</td>

                <td>{Condition(user)}</td>
                <td>
                    <div className="col">

                    </div>
                    <button title="visualizar">
                        <i className="pi pi-eye p-1" onClick={e => props.view(user)}></i>
                    </button>
                    <button title="editar">
                        <i className="pi pi-file-edit p-1" onClick={e => props.edit(user)}></i>
                    </button>

                </td>
            </tr>
        )
    })

    return (
        <Row>
            <Col className="-md-12">
                <div className="bs-component">
                    <table className="table table-hover text-center">
                        <thead>
                            <tr>
                                <th scope="col">Login</th>
                                <th scope="col">Função</th>
                                <th scope="col">Situação</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    )


}