import React from "react";

function FormGroupLogin(props) {
    return (
        <div className="form-group">
            <div className="form-floating mb-2">
                {props.children}
                <label htmlFor={props.htmlFor}>{props.label}</label>
            </div>
        </div>
    )
}

export default FormGroupLogin