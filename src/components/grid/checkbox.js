import React from "react";

const Checkbox = (props) => {
    return (
        <div className="form-check m-1">
            <input className={`form-check-input ${props.className}`} type="checkbox" name={props.name} value={props.value} onChange={props.onChange} checked={props.checked}/>
            {props.label}
        </div>
    )
}
export default Checkbox;