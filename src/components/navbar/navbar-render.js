import { render } from "@testing-library/react";
import React from "react";

export default function NavbarRender({ render, ...props }) {

    if (render) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Ninth navbar example">
                {props.children}
            </nav>
        )
    } else {
        return false;
    }
}