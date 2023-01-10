import React from "react";

export default function Col(props) {
    return (
            <div className={`col ${props.className}`} key={props.key} style={props.style}>
                {props.children}
            </div>
    )
}