import React from "react";

export default props => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="bs-component">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Login</th>
                                <th scope="col">Funçao</th>
                                <th scope="col">Condição</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-light">
                                <th scope="row">Light</th>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}