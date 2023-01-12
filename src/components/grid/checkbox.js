import React from "react";

export default function Checkbox(props) {
    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value={`${props.value}`} id="flexCheckChecked" />
            <label className="form-check-label" htmlFor="flexCheckChecked">
                {props.children}</label>
        </div>
    )
}