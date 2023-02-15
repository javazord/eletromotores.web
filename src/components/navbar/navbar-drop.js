import { render } from "@testing-library/react";
import React from "react";
import NavbarDropItem from "./navbar-drop-item";

export default function NavbarDrop({ render, ...props }) {
    
    if (render) {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="dropdown07XL" data-bs-toggle="dropdown" aria-expanded="false">{props.label}</a>
                <ul className="dropdown-menu" aria-labelledby="dropdown07XL">
                    {props.children}
                </ul>
            </li>
        )
    } else {
        return false;
    }
}