import { render } from "@testing-library/react";
import React from "react";

export default function FormGroup(props) {

    return (
        <div className={`form-group ${props.className}`}>
            <label>{props.label}</label>
            {props.children}
        </div>
    )
}