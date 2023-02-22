import React from "react";

export default function Row(props) {
    return (
            <div className={`row ${props.className}`} key={props.key} style={props.style}>
                {props.children}
            </div>
    )
}