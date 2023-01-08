import React from "react";

export function Tensao(props) {
    if (props.tensao == "TRIFASICO") {
        return "Trifásico"
    }

    if (props.tensao == "MONOFASICO") {
        return "Monofásico"
    }
}