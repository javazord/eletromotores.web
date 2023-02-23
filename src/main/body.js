import React from "react"
import Col from "../components/grid/col"
import Row from "../components/grid/row"

export default function Body(props) {


    return (
        <div className="page">
            <div className="container container-sm container-md container-lg">
                {props.children}
            </div>
        </div>

    )
}

