import { render } from "@testing-library/react";
import React from "react";

export default function Aside({ render, ...props }) {
    console.log(props.children)
    return (
        <aside className="sidebar" >
            <div>
                {props.children}
            </div>

        </aside>
    )
    if (render) {

    } else {
        return false;
    }
}

