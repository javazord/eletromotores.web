import React from "react";

function FormGroupLogin(props) {
    return (
        <div className="form-group">
            <div className="form-floating mb-2">
                <label htmlFor={props.htmlFor}>{props.label}</label>
                {props.children}
            </div>
        </div>
    )
}

export default FormGroupLogin