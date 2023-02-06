import { render } from "@testing-library/react";
import React from "react";

export default function Aside( { render, ...props } ) {
    if (render) {
        return (
            <aside className="sidebar" >
                {props.children}
            </aside>
        )
    } else {
        return false;
    }
}