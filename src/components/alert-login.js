
import React from "react";

export default class AlertLogin extends React.Component {


    render() {

        const alerta = this.state.alert;
        return (

            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button type="button" class="btn-close ms-2 mb-1" data-bs-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="toast-body">
                    {this.state.alert}
                </div>
            </div>


        )
    }
}