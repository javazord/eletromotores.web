import React from "react";
import { useNavigate } from "react-router";

export default function NavigateRouter(Component) {
    return props => <Component navHook={useNavigate()} />;
}
