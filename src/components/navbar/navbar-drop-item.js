import { render } from "@testing-library/react";
import React from "react";

export default function NavbarDropItem({...props }) {

    return (
        <li><a className="dropdown-item" href={props.href}>{props.label}</a></li>
    )


}