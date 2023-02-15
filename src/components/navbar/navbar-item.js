import { render } from "@testing-library/react";
import React from "react";

export default function NavbarItem({...props}) {
    
    return (
        <li className={`nav-item ${props.className}`} >
            <a className="nav-link" href={props.href} onClick={props.onClick}>
                {props.label}
            </a>
        </li>
    )


}