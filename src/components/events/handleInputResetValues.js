import React from "react";

export default function HandleInputResetValues (){
    
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );

        this.setState({
            itemvalues: [{}]
        });
    
}