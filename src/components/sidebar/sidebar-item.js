import { render } from "@testing-library/react";
import React from "react";

export default function SidebarItem(props) {

    return (
        <li className="nav-item">
            <a className="nav-link" href={props.href}>
                {props.children} {props.label}
            </a>
        </li>
    )


}