import { render } from "@testing-library/react";
import React from "react";
import MenuBar from "./menubar";

export default function MenuBarRender({ render, ...props }) {
    
    return render ? props.children : false;
}