import { render } from "@testing-library/react";
import React from "react";

export default function Aside( { render, ...props} ) {
    //console.log(props)
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