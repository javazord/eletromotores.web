import { render } from "@testing-library/react";
import React from "react";

export default function FormGroup(props) {

    return (
        <div className="form-group mb-2">
            {props.children}
        </div>
    )
}